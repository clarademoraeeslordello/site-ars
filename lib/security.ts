import "server-only";
import { createHash, createHmac, randomBytes } from "node:crypto";
import { headers } from "next/headers";

/** Random URL-safe token (256 bits). Only its hash is stored. */
export function newToken(): string {
  return randomBytes(32).toString("base64url");
}

/** SHA-256 of a token, as stored in the database. */
export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/** Client IP from the proxy headers (first hop). */
export async function clientIp(): Promise<string> {
  const h = await headers();
  return (h.get("x-forwarded-for")?.split(",")[0] ?? h.get("x-real-ip") ?? "").trim() || "unknown";
}

/** Keyed hash of an IP, so consent records can be audited without storing raw IPs. */
export function hashIp(ip: string): string | null {
  const secret = process.env.IP_HASH_SECRET;
  if (!secret || ip === "unknown") return null;
  return createHmac("sha256", secret).update(ip).digest("hex");
}

export async function userAgent(): Promise<string | null> {
  const ua = (await headers()).get("user-agent");
  return ua ? ua.slice(0, 300) : null;
}

/**
 * Fixed-window rate limit kept in memory. The site runs as a single instance on Railway, so
 * this is enough to stop form floods; it resets on restart, which is acceptable here.
 */
const windows = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const w = windows.get(key);
  if (!w || w.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    if (windows.size > 10_000) {
      for (const [k, v] of windows) if (v.resetAt <= now) windows.delete(k);
    }
    return true;
  }
  w.count += 1;
  return w.count <= limit;
}
