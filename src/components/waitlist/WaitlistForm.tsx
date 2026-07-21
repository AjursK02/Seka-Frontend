import { useState } from "react";
import Button from "../common/Button";

const emailRegex = /^(?![.])[A-Z0-9._%+-]+@[A-Z0-9-]+(?:\.[A-Z0-9-]+)+$/i;

const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
  const isLocalhostUrl =
    !!configuredApiBaseUrl &&
    /^(https?:\/\/)?(localhost|127\.0\.0\.1)(:\d+)?\/?$/i.test(configuredApiBaseUrl);

  const apiBaseUrl =
    configuredApiBaseUrl && !isLocalhostUrl
      ? configuredApiBaseUrl
      : import.meta.env.PROD
        ? "https://seka-backend.vercel.app"
        : "";

  const apiEndpoint = apiBaseUrl
    ? `${apiBaseUrl.replace(/\/+$/, "")}/api/waitlist`
    : "/api/waitlist";

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setFeedback({
        type: "error",
        message: "Please enter your email address.",
      });
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setFeedback({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const result: {
        success?: boolean;
        message?: string;
      } = await response.json();

      const isDuplicateEmail =
        response.status === 409 ||
        /already on the waitlist/i.test(result.message || "");

      if (!response.ok || isDuplicateEmail) {
        setFeedback({
          type: "error",
          message:
            result.message || "You are already on the waitlist.",
        });
        return;
      }

      setFeedback({
        type: "success",
        message: result.message || "You are on the waitlist. We will be in touch.",
      });
      setEmail("");
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 md:flex-row md:items-center"
      >
        <input
          type="email"
          required
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full flex-1 rounded-full border border-outline bg-white px-5 py-4 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
          aria-label="Email address"
          autoComplete="email"
          title="Please enter a valid email address"
        />

        <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
          {isSubmitting ? "Joining..." : "Join Early Access"}
        </Button>
      </form>

      {feedback ? (
        <div
          className={`mt-4 rounded-2xl border px-4 py-3 text-sm font-medium shadow-sm ${
            feedback.type === "success" && !/already on the waitlist/i.test(feedback.message)
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
          role="alert"
          aria-live="assertive"
        >
          {feedback.message}
        </div>
      ) : null}
    </div>
  );
};

export default WaitlistForm;
