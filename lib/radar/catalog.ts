/**
 * Standards the ISO Radar watches. `number` is matched against the ISO Open Data reference
 * (e.g. "ISO/IEC 27001:2022/Amd 1:2024" → "27001"). Add a row to start monitoring a standard.
 */
export type CatalogEntry = { key: string; number: string; name: string };

export const RADAR_CATALOG: CatalogEntry[] = [
  { key: "iso-9001", number: "9001", name: "ISO 9001" },
  { key: "iso-9000", number: "9000", name: "ISO 9000" },
  { key: "iso-14001", number: "14001", name: "ISO 14001" },
  { key: "iso-45001", number: "45001", name: "ISO 45001" },
  { key: "iso-50001", number: "50001", name: "ISO 50001" },
  { key: "iso-27001", number: "27001", name: "ISO/IEC 27001" },
  { key: "iso-27002", number: "27002", name: "ISO/IEC 27002" },
  { key: "iso-27005", number: "27005", name: "ISO/IEC 27005" },
  { key: "iso-27017", number: "27017", name: "ISO/IEC 27017" },
  { key: "iso-27018", number: "27018", name: "ISO/IEC 27018" },
  { key: "iso-27701", number: "27701", name: "ISO/IEC 27701" },
  { key: "iso-22301", number: "22301", name: "ISO 22301" },
  { key: "iso-42001", number: "42001", name: "ISO/IEC 42001" },
  { key: "iso-20000-1", number: "20000-1", name: "ISO/IEC 20000-1" },
  { key: "iso-13485", number: "13485", name: "ISO 13485" },
  { key: "iso-17025", number: "17025", name: "ISO/IEC 17025" },
  { key: "iso-17021-1", number: "17021-1", name: "ISO/IEC 17021-1" },
  { key: "iso-19011", number: "19011", name: "ISO 19011" },
  { key: "iso-31000", number: "31000", name: "ISO 31000" },
  { key: "iso-37001", number: "37001", name: "ISO 37001" },
  { key: "iso-37301", number: "37301", name: "ISO 37301" },
  { key: "iso-22000", number: "22000", name: "ISO 22000" },
  { key: "iso-28000", number: "28000", name: "ISO 28000" },
  { key: "iso-41001", number: "41001", name: "ISO 41001" },
  { key: "iso-55001", number: "55001", name: "ISO 55001" },
];

const BY_NUMBER = new Map(RADAR_CATALOG.map((e) => [e.number, e]));

export function catalogByKey(key: string) {
  return RADAR_CATALOG.find((e) => e.key === key);
}

/*
 * "ISO 9001:2015", "ISO/IEC 27001:2022/Amd 1:2024", "ISO/DIS 9001", "ISO/IEC DIS 27001",
 * "ISO/IEC 17025:2017", "ISO/FDIS 14001". Captures the base number (with part, e.g. 20000-1).
 */
const REFERENCE = /^ISO(?:\/(?:IEC|IEEE|NP|AWI|PWI|WD|CD|DIS|FDIS|PRF))*\s+(?:(?:NP|AWI|PWI|WD|CD|DIS|FDIS|PRF)\s+)?(\d+(?:-\d+)*)(?=[:/\s]|$)/;

export function catalogEntryForReference(reference: string): CatalogEntry | undefined {
  const m = REFERENCE.exec(reference);
  return m ? BY_NUMBER.get(m[1]) : undefined;
}
