import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-control font-sans transition-colors";

const variants: Record<Variant, string> = {
  primary: "bg-gold-cta font-semibold text-dark hover:bg-gold-deep hover:text-white",
  secondary: "border border-line bg-card font-medium text-ink hover:border-ink",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm leading-5",
  md: "px-5 py-[13px] text-[15px]",
};

/** Class names for a button-styled link or button (use with Link, <a> or <button>). */
export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  // Secondary has a 1px border, so it loses 1px of vertical padding to keep the same height.
  const sizeClass = variant === "secondary" && size === "md" ? "px-5 py-3 text-[15px]" : sizes[size];
  return cn(base, variants[variant], sizeClass, className);
}
