export const SITE_URL = (
  process.env.SITE_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://auditcockpits.com"
).replace(/\/$/, "");

export const APP_URL = "https://app.auditcockpits.com/";

export const COMPANY_NAME = "Audit Cockpits";
export const PRODUCT_NAME = "ARS";

export const CONTACT = {
  email: "auditreadinessscore@gmail.com",
  phone: "+55 21 99758-8376",
  phoneHref: "tel:+5521997588376",
};
