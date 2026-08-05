import { Navigate, Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { PublicRoute } from "../components/auth/PublicRoute";
import { MainLayout } from "../components/layout/MainLayout";
import Home from "../pages/Home";
import LoginPage from "../pages/Auth/LoginPage";
import ForgotPasswordPage from "../pages/Auth/ForgotPasswordPage";
import SignupPage from "../pages/Auth/SignupPage";
import VerifyEmailPage from "../pages/Auth/VerifyEmailPage";
import { CarePage } from "../pages/Care/CarePage";
import { DailyCheckInPage } from "../pages/Today/DailyCheckInPage";
import { DailyCheckInInsightPage } from "../pages/Today/DailyCheckInInsightPage";
import { MePage } from "../pages/Me/MePage";
import { HealthContextPage } from "../pages/Me/HealthContextPage";
import { PrepareForVisitPage } from "../pages/Me/PrepareForVisitPage";
import { PatternsPage } from "../pages/Patterns/PatternsPage";
import { TodayPage } from "../pages/Today/TodayPage";
import { OnboardingContext } from "../pages/Onboarding/OnboardingContext";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route element={<PublicRoute />}>
        <Route path="signup" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="verify-email" element={<VerifyEmailPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="onboarding" element={<OnboardingContext />} />
        <Route element={<MainLayout />}>
          <Route path="today" element={<TodayPage />} />
          <Route path="today/daily-check-in" element={<DailyCheckInPage />} />
          <Route path="today/daily-check-in/insight" element={<DailyCheckInInsightPage />} />
          <Route path="care" element={<CarePage />} />
          <Route path="patterns" element={<PatternsPage />} />
          <Route path="pattern" element={<Navigate to="/patterns" replace />} />
          <Route path="me" element={<MePage />} />
          <Route path="me/context" element={<HealthContextPage />} />
          <Route path="me/prepare-for-visit" element={<PrepareForVisitPage />} />
          <Route path="today/care" element={<Navigate to="/care" replace />} />
          <Route path="today/patterns" element={<Navigate to="/patterns" replace />} />
          <Route path="today/me" element={<Navigate to="/me" replace />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
