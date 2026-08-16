import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  forgotPasswordRequest,
  resetPasswordRequest,
  verifyForgotPasswordCodeRequest,
} from "../../auth/authApi";
import { AuthField } from "../../components/auth/AuthField";
import { AuthMinimalLayout } from "../../components/auth/AuthMinimalLayout";
import Button from "../../components/common/LandingButton";
import {
  validateCode,
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from "../../utils/authValidation";

type Step = "request" | "verify" | "reset";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const resendCooldownSeconds = 120;

  const [step, setStep] = useState<Step>("request");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [formError, setFormError] = useState("");
  const [formMessage, setFormMessage] = useState("");
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

  const clearFieldError = (key: string) => {
    setFieldErrors((current) => {
      if (!current[key]) {
        return current;
      }

      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const validateRequestForm = () => {
    const nextFieldErrors: Record<string, string> = {
      email: validateEmail(email),
    };

    Object.keys(nextFieldErrors).forEach((key) => {
      if (!nextFieldErrors[key]) {
        delete nextFieldErrors[key];
      }
    });

    setFieldErrors(nextFieldErrors);
    return Object.keys(nextFieldErrors).length === 0;
  };

  const validateVerifyForm = () => {
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

  const validateResetForm = () => {
    const nextFieldErrors: Record<string, string> = {
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
    };

    Object.keys(nextFieldErrors).forEach((key) => {
      if (!nextFieldErrors[key]) {
        delete nextFieldErrors[key];
      }
    });

    setFieldErrors(nextFieldErrors);
    return Object.keys(nextFieldErrors).length === 0;
  };

  const handleRequestCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    setFormMessage("");

    if (!validateRequestForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await forgotPasswordRequest({
        email: email.trim(),
      });

      setFormMessage(response.message || "A password reset code has been sent to your email.");
      setStep("verify");
      setResendCooldown(resendCooldownSeconds);
    } catch (error) {
      const response = error as {
        message?: string;
        errors?: Record<string, string>;
      };

      if (response.errors) {
        setFieldErrors(response.errors);
      }

      setFormError(response.message || "We couldn't send a reset code right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    setFormMessage("");

    if (!validateVerifyForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await verifyForgotPasswordCodeRequest({
        email: email.trim(),
        code: code.trim(),
      });

      if (!response.resetToken) {
        throw new Error("No reset token returned by the server.");
      }

      setResetToken(response.resetToken);
      setStep("reset");
      setFormMessage(response.message || "Code verified. You can now set a new password.");
    } catch (error) {
      const response = error as {
        message?: string;
        errors?: Record<string, string>;
      };

      if (response.errors) {
        setFieldErrors(response.errors);
      }

      setFormError(response.message || "We couldn't verify that code right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    setFormMessage("");

    if (!validateResetForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await resetPasswordRequest({
        resetToken,
        password,
        confirmPassword,
      });

      navigate("/login", {
        replace: true,
        state: {
          email: email.trim(),
          message: response.message || "Password updated successfully. Please log in.",
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

      setFormError(response.message || "We couldn't update your password right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    setFormError("");
    setFormMessage("");

    const emailError = validateEmail(email);
    if (emailError) {
      setFieldErrors((current) => ({ ...current, email: emailError }));
      return;
    }

    setIsResending(true);

    try {
      const response = await forgotPasswordRequest({
        email: email.trim(),
      });

      setFormMessage(response.message || "A new reset code has been sent to your email.");
      setResendCooldown(resendCooldownSeconds);
    } catch (error) {
      const response = error as {
        message?: string;
        errors?: Record<string, string>;
      };

      if (response.errors) {
        setFieldErrors(response.errors);
      }

      setFormError(response.message || "We couldn't resend the reset code right now.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthMinimalLayout
      footer={
        <span>
          Remembered your password?{" "}
          <Link className="font-semibold text-primary underline-offset-4 hover:underline" to="/login">
            Back to login
          </Link>
        </span>
      }
    >
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">Forgot password</h1>
          <p className="mt-2 text-sm text-gray-600">
            We’ll send a code to your email, then you can set a new password. Check your inbox or spam folder if the code does not show up.
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

        {step === "request" ? (
          <form className="space-y-5" onSubmit={handleRequestCode}>
            <AuthField
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                clearFieldError("email");
              }}
              error={fieldErrors.email}
              autoComplete="email"
            />

            <p className="text-xs leading-5 text-gray-500">
              After you send the request, we’ll email a reset code. Please check your inbox or spam folder for it.
            </p>

            <Button
              type="submit"
              className="w-full justify-center py-3 text-base font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending code..." : "Send reset code"}
            </Button>
          </form>
        ) : null}

        {step === "verify" ? (
          <form className="space-y-5" onSubmit={handleVerifyCode}>
            <p className="text-xs leading-5 text-gray-500">
              Enter the code from your email. If you do not see it, check your inbox and spam folder.
            </p>

            <AuthField
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                clearFieldError("email");
              }}
              error={fieldErrors.email}
              autoComplete="email"
            />

            <AuthField
              label="Verification code"
              placeholder="Enter the 6-digit code"
              value={code}
              onChange={(event) => {
                setCode(event.target.value);
                clearFieldError("code");
              }}
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
              {isSubmitting ? "Verifying..." : "Verify code"}
            </Button>

            <button
              type="button"
              className="w-full text-sm font-semibold text-primary underline-offset-4 hover:underline"
              onClick={handleResendCode}
              disabled={isResending || resendCooldown > 0}
            >
              {isResending
                ? "Sending new code..."
                : resendCooldown > 0
                  ? `Resend available in ${formatCooldown(resendCooldown)}`
                  : "Resend code"}
            </button>
          </form>
        ) : null}

        {step === "reset" ? (
          <form className="space-y-5" onSubmit={handleResetPassword}>
            <AuthField
              label="New password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a new password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                clearFieldError("password");
              }}
              error={fieldErrors.password}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:underline"
              onClick={() => setShowPassword((current) => !current)}
            >
              {showPassword ? "Hide password" : "Show password"}
            </button>

            <AuthField
              label="Confirm new password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                clearFieldError("confirmPassword");
              }}
              error={fieldErrors.confirmPassword}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:underline"
              onClick={() => setShowConfirmPassword((current) => !current)}
            >
              {showConfirmPassword ? "Hide confirmation" : "Show confirmation"}
            </button>

            <Button
              type="submit"
              className="w-full justify-center py-3 text-base font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating password..." : "Update password"}
            </Button>
          </form>
        ) : null}
      </div>
    </AuthMinimalLayout>
  );
};

export default ForgotPasswordPage;
