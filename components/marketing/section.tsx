import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section
      className={cn(
        "px-4 py-16 sm:px-6 sm:py-24",
        dark && "bg-ink text-paper",
        className
      )}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

export function Eyebrow({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      className={cn(
        "font-data text-xs uppercase tracking-[0.2em]",
        dark ? "text-gold-bright" : "text-gold"
      )}
    >
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "mt-3 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl",
        className
      )}
    >
      {children}
    </h2>
  );
}
