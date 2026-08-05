import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../auth/AuthContext";
import { AuthField } from "../../components/auth/AuthField";
import { AuthMinimalLayout } from "../../components/auth/AuthMinimalLayout";
import Button from "../../components/common/LandingButton";
import {
  validateConfirmPassword,
  validateEmail,
  validateMobileNumber,
  validateName,
  validatePassword,
} from "../../utils/authValidation";

interface LocationState {
  email?: string;
  message?: string;
}

const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signup, status } = useAuth();
  const state = (location.state || {}) as LocationState;

  const [name, setName] = useState("");
  const [email, setEmail] = useState(state.email || "");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});



  const validateForm = () => {
    const nextFieldErrors: Record<string, string> = {
      name: validateName(name),
      email: validateEmail(email),
      mobileNumber: validateMobileNumber(mobileNumber),
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await signup({
        name: name.trim(),
        email: email.trim(),
        mobileNumber: mobileNumber.trim(),
        password,
        confirmPassword,
      });

      navigate("/verify-email", {
        replace: true,
        state: {
          email: email.trim(),
          message:
            response.message ||
            "We sent a verification code to your email address. Enter it to finish signup.",
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

      setFormError(response.message || "We couldn't create your account right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthMinimalLayout
      footer={
        <span>
          Already have an account?{" "}
          <Link className="font-semibold text-primary underline-offset-4 hover:underline" to="/login">
            Log in here
          </Link>
        </span>
      }
    >
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">Create account</h1>
        </div>

        {state.message ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
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
            label="Full name"
            placeholder="Your full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            error={fieldErrors.name}
            autoComplete="name"
          />

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
            label="Mobile number"
            type="tel"
            placeholder="Enter your mobile number"
            value={mobileNumber}
            onChange={(event) => setMobileNumber(event.target.value)}
            error={fieldErrors.mobileNumber}
            autoComplete="tel"
          />

          <AuthField
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
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
            label="Confirm password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
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
            disabled={isSubmitting || status === "loading"}
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </div>
    </AuthMinimalLayout>
  );
};

export default SignupPage;
