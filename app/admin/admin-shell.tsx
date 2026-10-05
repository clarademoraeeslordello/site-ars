import Link from "next/link";
import type { ReactNode } from "react";
import { logoutAction } from "./actions";

export function AdminShell({ email, active, children }: { email: string; active: "radar" | "newsletter"; children: ReactNode }) {
  const tab = (key: typeof active, href: string, label: string) => (
    <Link
      href={href}
      aria-current={active === key ? "page" : undefined}
      className={active === key ? "font-semibold text-ink" : "text-body hover:text-ink"}
    >
      {label}
    </Link>
  );
  return (
    <div className="mx-auto flex max-w-[1080px] flex-col gap-8 px-4 py-8 sm:px-7">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
        <nav className="flex items-center gap-6 text-[15px]">
          <span className="font-display text-lg font-semibold tracking-[0.06em]">ARS · Painel</span>
          {tab("radar", "/admin/radar", "ISO Radar")}
          {tab("newsletter", "/admin/newsletter", "Newsletter")}
        </nav>
        <form action={logoutAction} className="flex items-center gap-3 text-sm text-muted">
          {email}
          <button type="submit" className="rounded-control border border-line bg-card px-3 py-1.5 text-ink hover:bg-hover">
            Sair
          </button>
        </form>
      </header>
      {children}
    </div>
  );
}

export const btn = {
  primary: "rounded-control bg-gold-cta px-4 py-2 text-sm font-semibold text-dark hover:bg-gold-deep hover:text-white",
  secondary: "rounded-control border border-line bg-card px-4 py-2 text-sm font-medium text-ink hover:bg-hover",
  danger: "rounded-control border border-line bg-card px-4 py-2 text-sm font-medium text-crit hover:bg-crit-bg",
};
