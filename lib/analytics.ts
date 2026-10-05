/**
 * GA4 events (handoff list): cta_demo_click, cta_platform_click, newsletter_subscribe,
 * article_open, source_click, language_switch, form_submit, app_login_click.
 * No-op until the visitor accepts analytics cookies and GA is loaded.
 */
export type AnalyticsEvent =
  | "cta_demo_click"
  | "cta_platform_click"
  | "newsletter_subscribe"
  | "article_open"
  | "source_click"
  | "language_switch"
  | "form_submit"
  | "app_login_click";

type Gtag = (command: "event", name: string, params?: Record<string, string>) => void;

export function trackEvent(name: AnalyticsEvent, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", name, params);
}

export const CONSENT_STORAGE_KEY = "ars-analytics-consent"; // "granted" | "denied"
export const OPEN_CONSENT_EVENT = "ars:open-consent";
