import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../auth/AuthContext";
import { AuthField } from "../../components/auth/AuthField";
import { AuthMinimalLayout } from "../../components/auth/AuthMinimalLayout";
import Button from "../../components/common/LandingButton";
import { validateEmail, validateLoginPassword } from "../../utils/authValidation";

interface LocationState {
  email?: string;
  message?: string;
  from?: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, status } = useAuth();
  const state = (location.state || {}) as LocationState;

  const [email, setEmail] = useState(state.email || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});



  const validateForm = () => {
    const nextFieldErrors: Record<string, string> = {
      email: validateEmail(email),
      password: validateLoginPassword(password),
    };

    Object.keys(nextFieldErrors).forEach((key) => {
      if (!nextFieldErrors[key]) {
        delete nextFieldErrors[key];
      }
    });

    setFieldErrors(nextFieldErrors);
    return Object.keys(nextFieldErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await login({
        email: email.trim(),
        password,
      });

      navigate(state.from || "/care", { replace: true });
    } catch (error) {
      const response = error as {
        message?: string;
        errors?: Record<string, string>;
        verificationRequired?: boolean;
      };

      if (response.errors) {
        setFieldErrors(response.errors);
      }

      if (response.verificationRequired && email.trim()) {
        navigate("/verify-email", {
          replace: true,
          state: {
            email: email.trim(),
            message: response.message || "Please verify your email before logging in.",
          },
        });
        return;
      }

      setFormError(response.message || "We couldn't log you in right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthMinimalLayout
      footer={
        <span>
          New here?{" "}
          <Link className="font-semibold text-primary underline-offset-4 hover:underline" to="/signup">
            Create an account
          </Link>
        </span>
      }
    >
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">Log in</h1>
        </div>

        {state.message ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
            {state.message}
          </div>
        ) : null}

        {formError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {formError}
          </div>
        ) : null}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <AuthField
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={fieldErrors.email}
            autoComplete="email"
          />

          <AuthField
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={fieldErrors.password}
            autoComplete="current-password"
          />
          <button
            type="button"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:underline"
            onClick={() => setShowPassword((current) => !current)}
          >
            {showPassword ? "Hide password" : "Show password"}
          </button>

          <Button
            type="submit"
            className="w-full justify-center py-3 text-base font-semibold"
            disabled={isSubmitting || status === "loading"}
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </Button>

          <div className="flex justify-center pt-2">
            <Link className="text-sm font-semibold text-primary underline-offset-4 hover:underline" to="/forgot-password">
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </AuthMinimalLayout>
  );
};

export default LoginPage;
