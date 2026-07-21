import React from "react";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  onClick,
  className,
  type = "button",
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border px-8 py-4 text-sm font-semibold tracking-[0.08em] uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-60",

        variant === "primary" &&
          "border-[#b6212a] bg-white !text-[#b6212a] shadow-[0_8px_22px_-12px_rgba(182,33,42,0.22)] hover:-translate-y-1 hover:border-[#b6212a] hover:!bg-[#b6212a] hover:!text-white hover:shadow-[0_16px_35px_-12px_rgba(182,33,42,0.4)]",

        variant === "outline" &&
          "border-[#b6212a] bg-white text-[#b6212a] shadow-[0_8px_22px_-12px_rgba(182,33,42,0.22)] hover:-translate-y-1 hover:bg-[#fbeaec] hover:shadow-[0_10px_25px_-12px_rgba(182,33,42,0.28)]",

        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
