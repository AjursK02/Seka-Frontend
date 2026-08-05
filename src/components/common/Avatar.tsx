import clsx from "clsx";

export interface AvatarProps {
  name: string;
  initials?: string;
  imageUrl?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses: Record<NonNullable<AvatarProps["size"]>, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-sm",
};

export function Avatar({
  name,
  initials,
  imageUrl,
  alt,
  size = "md",
  className,
}: AvatarProps) {
  const fallback = initials ?? name.slice(0, 2).toUpperCase();

  return (
    <div
      className={clsx(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-soft to-surface-strong font-semibold text-primary",
        sizeClasses[size],
        className,
      )}
      aria-label={alt ?? name}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={alt ?? name} className="h-full w-full object-cover" />
      ) : (
        <span>{fallback}</span>
      )}
    </div>
  );
}
