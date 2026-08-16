import { useEffect, useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { resendVerificationCodeRequest, verifyEmailRequest } from "../../auth/authApi";
import { AuthField } from "../../components/auth/AuthField";
import { AuthMinimalLayout } from "../../components/auth/AuthMinimalLayout";
import Button from "../../components/common/LandingButton";
import { validateCode, validateEmail } from "../../utils/authValidation";

interface LocationState {
  email?: string;
  message?: string;
}

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;
  const resendCooldownSeconds = 120;

  const [email, setEmail] = useState(state.email || "");
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(resendCooldownSeconds);
  const [formError, setFormError] = useState("");
  const [formMessage, setFormMessage] = useState(state.message || "");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (resendCooldown <= 0) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setResendCooldown((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [resendCooldown]);

  const formatCooldown = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const validateForm = () => {
    const nextFieldErrors: Record<string, string> = {
      email: validateEmail(email),
      code: validateCode(code),
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
    setFormMessage("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await verifyEmailRequest({
        email: email.trim(),
        code: code.trim(),
      });

      navigate("/login", {
        replace: true,
        state: {
          email: email.trim(),
          message: response.message || "Email verified successfully. You can log in now.",
        },
      });
    } catch (error) {
      const response = error as {
        message?: string;
        errors?: Record<string, string>;
      };

      if (response.errors) {
        setFieldErrors(response.errors);
      }

      setFormError(response.message || "We couldn't verify your email right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setFormError("");
    setFormMessage("");

    if (resendCooldown > 0) {
      setFormError(`Please wait ${formatCooldown(resendCooldown)} before requesting another code.`);
      return;
    }

    const emailError = validateEmail(email);
    if (emailError) {
      setFieldErrors((current) => ({ ...current, email: emailError }));
      return;
    }

    setIsResending(true);

    try {
      const response = await resendVerificationCodeRequest({
        email: email.trim(),
      });

      setFormMessage(response.message || "A new code has been sent to your email.");
      setResendCooldown(resendCooldownSeconds);
    } catch (error) {
      const response = error as {
        message?: string;
        errors?: Record<string, string>;
      };

      if (response.errors) {
        setFieldErrors(response.errors);
      }

      setFormError(response.message || "We couldn't resend the verification code right now.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthMinimalLayout
      footer={
        <span>
          Already verified?{" "}
          <Link className="font-semibold text-primary underline-offset-4 hover:underline" to="/login">
            Back to login
          </Link>
        </span>
      }
    >
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">Verify your email</h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter the code we sent to your registered email address. Check your inbox or spam folder if you do not see it.
          </p>
        </div>

        {formMessage ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
            {formMessage}
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
            label="Verification code"
            placeholder="Enter the 6-digit code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            error={fieldErrors.code}
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
          />

          <Button
            type="submit"
            className="w-full justify-center py-3 text-base font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Verify email"}
          </Button>

          <button
            type="button"
            className="w-full text-sm font-semibold text-primary underline-offset-4 hover:underline"
            onClick={handleResend}
            disabled={isResending || resendCooldown > 0}
          >
            {isResending
              ? "Sending new code..."
              : resendCooldown > 0
                ? `Resend available in ${formatCooldown(resendCooldown)}`
                : "Resend code"}
          </button>
        </form>
      </div>
    </AuthMinimalLayout>
  );
};

export default VerifyEmailPage;
