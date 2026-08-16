import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Loader2, Mail, MapPin, UserRoundCog } from "lucide-react";

import { useAuth } from "../../auth/AuthContext";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Section } from "../../components/common/Section";
import { Typography } from "../../components/common/Typography";

interface FieldErrors {
  name?: string;
  mobileNumber?: string;
}

export function PersonalInfoPage() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setName(user?.name ?? "");
    setMobileNumber(user?.mobileNumber ?? "");
  }, [user?.name, user?.mobileNumber]);

  const email = user?.email ?? "";

  const profileStats = useMemo(() => {
    return [
      { label: "Email", value: email || "Not added", icon: Mail },
      { label: "Member since", value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { month: "long", year: "numeric" }) : "—", icon: MapPin },
      { label: "Verified", value: user?.isEmailVerified ? "Yes" : "No", icon: Check },
    ];
  }, [email, user?.createdAt, user?.isEmailVerified]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setFieldErrors({});

    const nextErrors: FieldErrors = {};

    if (name.trim().length < 2) {
      nextErrors.name = "Name must be at least 2 characters.";
    } else if (name.trim().length > 50) {
      nextErrors.name = "Name must be at most 50 characters.";
    }

    if (!mobileNumber.trim()) {
      nextErrors.mobileNumber = "Mobile number is required.";
    } else if (!/^[0-9+\s\-()]{7,15}$/.test(mobileNumber.trim())) {
      nextErrors.mobileNumber = "Please enter a valid mobile number.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await updateProfile({
        name: name.trim(),
        mobileNumber: mobileNumber.trim(),
      });
      setSuccess("Your profile was updated successfully.");
    } catch (err) {
      const response = err as { message?: string; errors?: Record<string, string> };
      if (response?.errors) {
        setFieldErrors({
          name: response.errors.name,
          mobileNumber: response.errors.mobileNumber,
        });
      } else {
        setError(response?.message || "Failed to update your profile. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section className="space-y-8 pb-10">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          aria-label="Back to Me"
          onClick={() => navigate("/me")}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-outline bg-surface text-text-muted transition-all duration-200 hover:bg-primary-soft hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 rounded-full border border-outline bg-surface px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
          <UserRoundCog className="h-4 w-4 text-primary" />
          Personal Information
        </div>
      </div>

      <div className="space-y-3">
        <Typography as="p" variant="micro" className="text-primary">
          Your Account
        </Typography>
        <Typography as="h1" variant="display">
          Personal information
        </Typography>
        <Typography variant="bodyMuted" className="max-w-3xl">
          Review and update the details SEKA uses to personalize your care. Your email is your login identity and cannot be changed here.
        </Typography>
      </div>

      {error ? (
        <Card className="border-red-200 bg-red-50 text-red-700">
          <Typography variant="body">{error}</Typography>
        </Card>
      ) : null}

      {success ? (
        <Card className="border-emerald-200 bg-emerald-50 text-emerald-800">
          <Typography variant="body">{success}</Typography>
        </Card>
      ) : null}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
        <Card className="space-y-5">
          <div>
            <Typography as="h2" variant="title">
              Update your details
            </Typography>
            <Typography variant="bodyMuted" className="mt-1">
              Changes save instantly and update your profile across SEKA.
            </Typography>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-text">Full name</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                placeholder="Your full name"
                className={[
                  "w-full rounded-2xl border px-4 py-3 text-base outline-none transition placeholder:text-text-muted/60 focus:border-primary focus:ring-2 focus:ring-primary/15",
                  fieldErrors.name
                    ? "border-red-300 bg-red-50/60"
                    : "border-outline bg-surface",
                ].join(" ")}
              />
              {fieldErrors.name ? (
                <span className="mt-2 block text-xs font-medium text-red-600">{fieldErrors.name}</span>
              ) : null}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-text">Email address</span>
              <input
                value={email}
                disabled
                type="email"
                className="w-full cursor-not-allowed rounded-2xl border border-outline bg-surface-muted px-4 py-3 text-base text-text-muted outline-none"
              />
              <span className="mt-2 block text-xs text-text-muted">
                Your email is your login identity and is not editable.
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-text">Mobile number</span>
              <input
                value={mobileNumber}
                onChange={(event) => setMobileNumber(event.target.value)}
                autoComplete="tel"
                type="tel"
                placeholder="Enter your mobile number"
                className={[
                  "w-full rounded-2xl border px-4 py-3 text-base outline-none transition placeholder:text-text-muted/60 focus:border-primary focus:ring-2 focus:ring-primary/15",
                  fieldErrors.mobileNumber
                    ? "border-red-300 bg-red-50/60"
                    : "border-outline bg-surface",
                ].join(" ")}
              />
              {fieldErrors.mobileNumber ? (
                <span className="mt-2 block text-xs font-medium text-red-600">{fieldErrors.mobileNumber}</span>
              ) : null}
            </label>

            <Button
              type="submit"
              className="w-full justify-center"
              disabled={isSubmitting}
              leadingIcon={
                isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : undefined
              }
            >
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </form>
        </Card>

        <Card className="space-y-4">
          <div>
            <Typography as="h2" variant="title">
              Account overview
            </Typography>
            <Typography variant="bodyMuted" className="mt-1">
              Details tied to your SEKA account.
            </Typography>
          </div>

          <div className="space-y-3">
            {profileStats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-2xl border border-outline/70 bg-surface px-4 py-3"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-strong text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                      {item.label}
                    </p>
                    <p className="mt-1 truncate text-sm font-semibold text-text">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </Section>
  );
}