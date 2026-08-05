import type { InputHTMLAttributes } from "react";

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function AuthField({ label, error, className = "", ...props }: AuthFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-gray-800">{label}</span>
      <input
        {...props}
        className={`w-full rounded-2xl border px-4 py-3 text-base outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/15 ${
          error ? "border-red-300 bg-red-50/60" : "border-outline bg-white"
        } ${className}`}
      />
      {error ? <span className="mt-2 block text-xs font-medium text-red-600">{error}</span> : null}
    </label>
  );
}
