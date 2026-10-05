/**
 * ISO Survey 2024 (ISO/IAF CertSearch), ISO/IEC 27001 certificates by country.
 * Source: https://www.iso.org/the-iso-survey.html (figures from the design handoff).
 * `id` is the ISO 3166-1 numeric code used by world-atlas.
 */
export const ISO27001_TOP_COUNTRIES = [
  { key: "china", id: "156", value: 33359 },
  { key: "india", id: "356", value: 6758 },
  { key: "japan", id: "392", value: 6644 },
  { key: "uk", id: "826", value: 4445 },
  { key: "usa", id: "840", value: 4260 },
  { key: "italy", id: "380", value: 3284 },
  { key: "turkiye", id: "792", value: 3202 },
  { key: "germany", id: "276", value: 2444 },
] as const;

export const BRAZIL_ID = "076";

export const ISO27001_MAX = ISO27001_TOP_COUNTRIES[0].value;

export type CountryKey = (typeof ISO27001_TOP_COUNTRIES)[number]["key"] | "brazil";
