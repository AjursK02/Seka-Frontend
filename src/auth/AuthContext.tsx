import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  authStorage,
  invalidateAuthRequestCache,
  loginRequest,
  logoutRequest,
  meRequest,
  refreshRequest,
  SESSION_DURATION_MS,
  signupRequest,
  updateOnboardingRequest,
  updateProfileRequest,
} from "./authApi";
import type { AuthResponse, AuthState, AuthUser } from "./types";

interface SignupPayload {
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
  confirmPassword: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthContextValue extends AuthState {
  signup: (payload: SignupPayload) => Promise<AuthResponse>;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  setAuthenticatedSession: (accessToken: string, user: AuthUser) => void;
  refreshSession: () => Promise<boolean>;
  updateProfile: (payload: {
    name?: string;
    mobileNumber?: string;
  }) => Promise<void>;
  completeOnboarding: (onboardingAnswers: {
    pcosConcern: string[];
    periodFrequency: string;
    symptomsNoticed: string[];
    symptomsNoticedCustom: string;
    symptomDuration: string;
    symptomDurationCustom: string;
    previousTests: string[];
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const initialState: AuthState = {
  status: "loading",
  user: null,
  accessToken: null,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const storedToken = authStorage.getAccessToken();
    const storedUser = authStorage.getStoredUser();
    const isSessionExpired = authStorage.isSessionExpired();

    if (storedToken && storedUser && !isSessionExpired) {
      return {
        status: "loading",
        user: storedUser,
        accessToken: storedToken,
      };
    }

    return initialState;
  });

  const setAuthenticatedSession = useCallback((accessToken: string, user: AuthUser) => {
    authStorage.setSession(accessToken, user, SESSION_DURATION_MS);
    invalidateAuthRequestCache();
    setState({
      status: "authenticated",
      user,
      accessToken,
    });
  }, []);

  const clearSession = useCallback(() => {
    authStorage.clearSession();
    invalidateAuthRequestCache();
    setState({
      status: "unauthenticated",
      user: null,
      accessToken: null,
    });
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      const response = await refreshRequest();

      if (response.accessToken && response.user) {
        setAuthenticatedSession(response.accessToken, response.user);
        return true;
      }

      clearSession();
      return false;
    } catch {
      clearSession();
      return false;
    }
  }, [clearSession, setAuthenticatedSession]);

  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      const storedToken = authStorage.getAccessToken();
      const storedUser = authStorage.getStoredUser();
      const isSessionExpired = authStorage.isSessionExpired();

      if (!storedToken || isSessionExpired) {
        if (isMounted) {
          clearSession();
        }
        return;
      }

      if (storedUser) {
        setState({
          status: "loading",
          user: storedUser,
          accessToken: storedToken,
        });
      }

      try {
        const response = await meRequest(storedToken);

        if (response.user && response.accessToken) {
          if (isMounted) {
            setAuthenticatedSession(response.accessToken, response.user);
          }
          return;
        }

        if (response.user && isMounted) {
          authStorage.setSession(storedToken, response.user, SESSION_DURATION_MS);
          setState({
            status: "authenticated",
            user: response.user,
            accessToken: storedToken,
          });
          return;
        }
      } catch {
        // fall through to refresh
      }

      const refreshed = await refreshSession();

      if (isMounted && !refreshed) {
        clearSession();
      }
    };

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, []);

  const signup = useCallback((payload: SignupPayload) => {
    return signupRequest(payload);
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const response = await loginRequest(payload);

    if (!response.accessToken || !response.user) {
      throw new Error("Login failed. Please try again.");
    }

    setAuthenticatedSession(response.accessToken, response.user);
  }, [setAuthenticatedSession]);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      clearSession();
    }
  }, [clearSession]);

  const completeOnboarding = useCallback(async (onboardingAnswers: {
    pcosConcern: string[];
    periodFrequency: string;
    symptomsNoticed: string[];
    symptomsNoticedCustom: string;
    symptomDuration: string;
    symptomDurationCustom: string;
    previousTests: string[];
  }) => {
    if (!state.accessToken) {
      throw new Error("No active session. Please log in.");
    }

    const response = await updateOnboardingRequest(state.accessToken, {
      onboardingAnswers,
    });

    if (response.user) {
      setAuthenticatedSession(state.accessToken, response.user);
    } else {
      throw new Error(response.message || "Failed to save onboarding answers.");
    }
  }, [clearSession, setAuthenticatedSession, state.accessToken]);

  const updateProfile = useCallback(async (payload: {
    name?: string;
    mobileNumber?: string;
  }) => {
    if (!state.accessToken) {
      throw new Error("No active session. Please log in.");
    }

    const response = await updateProfileRequest(state.accessToken, payload);

    if (response.user) {
      setAuthenticatedSession(state.accessToken, response.user);
    } else if (response.errors) {
      throw response;
    } else {
      throw new Error(response.message || "Failed to update your profile.");
    }
  }, [setAuthenticatedSession, state.accessToken]);

  const contextValue = useMemo(
    () => ({
      ...state,
      signup,
      login,
      logout,
      setAuthenticatedSession,
      refreshSession,
      completeOnboarding,
      updateProfile,
    }),
    [state, signup, login, logout, setAuthenticatedSession, refreshSession, completeOnboarding, updateProfile]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
