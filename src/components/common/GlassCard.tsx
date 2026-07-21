import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const GlassCard = ({ children, className }: Props) => {
  return (
    <div
      className={`rounded-3xl border bg-white/70 backdrop-blur-xl shadow-xl ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;