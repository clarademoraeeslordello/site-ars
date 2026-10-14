export const SITE_URL = (
  process.env.SITE_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://auditcockpits.com"
).replace(/\/$/, "");

export const APP_URL = "https://app.auditcockpits.com/";

export const COMPANY_NAME = "Audit Cockpits";
/** ADR-014: Audit Cockpits is the single name of the company and of the platform. */
export const PRODUCT_NAME = COMPANY_NAME;
export const TAGLINE = "Compliance Intelligence Platform";

export const CONTACT = {
  email: "auditreadinessscore@gmail.com",
  phone: "+55 21 99758-8376",
  phoneHref: "tel:+5521997588376",
};
