import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { PublicRoute } from "../components/auth/PublicRoute";
import { CareProvider } from "../context/CareContext";

const Home = lazy(() => import("../pages/Home"));
const LoginPage = lazy(() => import("../pages/Auth/LoginPage"));
const ForgotPasswordPage = lazy(() => import("../pages/Auth/ForgotPasswordPage"));
const SignupPage = lazy(() => import("../pages/Auth/SignupPage"));
const VerifyEmailPage = lazy(() => import("../pages/Auth/VerifyEmailPage"));
const MainLayout = lazy(() => import("../components/layout/MainLayout").then((module) => ({ default: module.MainLayout })));
const OnboardingContext = lazy(() =>
  import("../pages/Onboarding/OnboardingContext").then((module) => ({
    default: module.OnboardingContext,
  })),
);
const TodayPage = lazy(() => import("../pages/Today/TodayPage").then((module) => ({ default: module.TodayPage })));
const DailyCheckInPage = lazy(() => import("../pages/Today/DailyCheckInPage").then((module) => ({ default: module.DailyCheckInPage })));
const DailyCheckInInsightPage = lazy(() => import("../pages/Today/DailyCheckInInsightPage").then((module) => ({ default: module.DailyCheckInInsightPage })));
const CarePage = lazy(() => import("../pages/Care/CarePage").then((module) => ({ default: module.CarePage })));
const MePage = lazy(() => import("../pages/Me/MePage").then((module) => ({ default: module.MePage })));
const HealthContextPage = lazy(() => import("../pages/Me/HealthContextPage").then((module) => ({ default: module.HealthContextPage })));
const PersonalInfoPage = lazy(() => import("../pages/Me/PersonalInfoPage").then((module) => ({ default: module.PersonalInfoPage })));
const PrepareForVisitPage = lazy(() => import("../pages/Me/PrepareForVisitPage").then((module) => ({ default: module.PrepareForVisitPage })));
const PrivacySecurityPage = lazy(() => import("../pages/Privacy/PrivacySecurityPage").then((module) => ({ default: module.PrivacySecurityPage })));
const TermsOfServicePage = lazy(() => import("../pages/Terms/TermsOfServicePage").then((module) => ({ default: module.TermsOfServicePage })));

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-6 text-sm text-text-muted">
      Loading SEKA...
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="privacy-policy" element={<PrivacySecurityPage />} />
        <Route path="terms-of-service" element={<TermsOfServicePage />} />

        <Route element={<PublicRoute />}>
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="verify-email" element={<VerifyEmailPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="onboarding" element={<OnboardingContext />} />
          <Route
            element={
              <CareProvider>
                <MainLayout />
              </CareProvider>
            }
          >
            <Route path="today" element={<TodayPage />} />
            <Route path="today/daily-check-in" element={<DailyCheckInPage />} />
            <Route path="today/daily-check-in/insight" element={<DailyCheckInInsightPage />} />
            <Route path="care" element={<CarePage />} />
            <Route path="me" element={<MePage />} />
            <Route path="me/personal" element={<PersonalInfoPage />} />
            <Route path="me/context" element={<HealthContextPage />} />
            <Route path="me/prepare-for-visit" element={<PrepareForVisitPage />} />
            <Route path="today/care" element={<Navigate to="/care" replace />} />
            <Route path="today/patterns" element={<Navigate to="/patterns" replace />} />
            <Route path="today/me" element={<Navigate to="/me" replace />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
