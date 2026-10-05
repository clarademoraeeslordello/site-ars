import type { Metadata } from "next";
import type { ReactNode } from "react";

/** Metadata for token pages: never indexed, and no Referer header that could leak the token. */
export function tokenPageMetadata(title: string): Metadata {
  return { title, robots: { index: false, follow: false }, referrer: "no-referrer" };
}

/** Centered card used by the newsletter confirm / preferences / unsubscribe pages. */
export function TokenPageCard({ title, children, status }: { title: string; children: ReactNode; status?: "ok" | "error" }) {
  return (
    <section aria-labelledby="page-title" className="container-site pt-[clamp(48px,8vw,96px)]">
      <div className="mx-auto flex max-w-[620px] flex-col gap-4 rounded-card border border-line bg-card p-[clamp(28px,5vw,48px)]">
        <span className="eyebrow">ISO Radar</span>
        <h1 id="page-title" className="m-0 font-display text-h2 font-medium">
          {title}
        </h1>
        {status && (
          <span
            aria-hidden="true"
            className={status === "ok" ? "h-1 w-12 rounded-full bg-ok" : "h-1 w-12 rounded-full bg-crit"}
          />
        )}
        {children}
      </div>
    </section>
  );
}
