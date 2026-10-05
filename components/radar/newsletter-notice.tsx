"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

const NOTICES = ["confirmed", "unsubscribed", "invalid"] as const;

/** Shows the result of a confirm/unsubscribe link (?newsletter=…). */
export function NewsletterNotice() {
  const t = useTranslations("radarPage.notice");
  const value = useSearchParams().get("newsletter");
  const notice = NOTICES.find((n) => n === value);
  if (!notice) return null;
  return (
    <p role="status" className="m-0 rounded-control border border-tint-line bg-tint px-4 py-3.5 text-[15px] font-medium">
      {t(notice)}
    </p>
  );
}
