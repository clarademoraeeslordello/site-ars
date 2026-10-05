import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** H2 + optional eyebrow and lead, as used at the top of each chapter of the site. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  dark = false,
  className,
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3.5", className)}>
      {eyebrow && <span className={cn("eyebrow", dark && "text-gold-cta")}>{eyebrow}</span>}
      <h2 id={id} className="m-0 font-display text-h2 font-medium">
        {title}
      </h2>
      {lead && (
        <p className={cn("m-0 text-base leading-[1.65] text-pretty", dark ? "text-dark-body" : "text-body")}>
          {lead}
        </p>
      )}
    </div>
  );
}
