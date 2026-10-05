import "server-only";
import { timingSafeEqual } from "node:crypto";

/** Cron endpoints take `Authorization: Bearer $CRON_SECRET` (sent by the Railway cron service). */
export function isCronRequest(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const given = Buffer.from(request.headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${secret}`);
  return given.length === expected.length && timingSafeEqual(given, expected);
}
