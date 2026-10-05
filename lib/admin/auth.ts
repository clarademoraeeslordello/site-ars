import "server-only";
import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { and, eq, gt, isNull } from "drizzle-orm";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "@/db/client";
import { adminLoginTokens } from "@/db/schema";
import { adminEmails, sendMagicLink } from "@/lib/email";
import { SITE_URL } from "@/lib/site";

const COOKIE = "ars_admin";
const SESSION_DAYS = 7;
const LINK_MINUTES = 15;

function secret() {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 32) throw new Error("ADMIN_SESSION_SECRET must be set (32+ characters)");
  return s;
}

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");
const sign = (payload: string) => createHmac("sha256", secret()).update(payload).digest("base64url");

/** Sends a one-time link when the address is on ADMIN_EMAILS. Silent otherwise, so the form does not reveal who is an admin. */
export async function requestMagicLink(rawEmail: string) {
  const email = rawEmail.trim().toLowerCase();
  if (!adminEmails().includes(email)) return;
  const token = randomBytes(32).toString("base64url");
  await getDb()
    .insert(adminLoginTokens)
    .values({ tokenHash: sha256(token), email, expiresAt: new Date(Date.now() + LINK_MINUTES * 60_000), ipHash: await requestIpHash() });
  // The link opens a confirmation page; the token is only spent by its POST, so mail scanners
  // that prefetch links cannot use it up.
  await sendMagicLink(email, `${SITE_URL}/admin/login/verify?token=${encodeURIComponent(token)}`);
}

/** Spends a magic-link token and starts a session. Returns false when the link is invalid or used. */
export async function consumeMagicLink(token: string) {
  const db = getDb();
  const [row] = await db
    .update(adminLoginTokens)
    .set({ usedAt: new Date() })
    .where(
      and(
        eq(adminLoginTokens.tokenHash, sha256(token)),
        isNull(adminLoginTokens.usedAt),
        gt(adminLoginTokens.expiresAt, new Date())
      )
    )
    .returning({ email: adminLoginTokens.email });
  if (!row || !adminEmails().includes(row.email)) return false;

  const exp = Date.now() + SESSION_DAYS * 86_400_000;
  const payload = `${Buffer.from(row.email).toString("base64url")}.${exp}`;
  (await cookies()).set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(exp),
  });
  return true;
}

/** Client IP, hashed with the server secret (raw IPs are never stored). */
export async function requestIpHash() {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip");
  return ip ? createHmac("sha256", secret()).update(ip).digest("hex") : null;
}

export async function getAdminEmail(): Promise<string | null> {
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return null;
  const [emailB64, exp, mac] = value.split(".");
  if (!emailB64 || !exp || !mac) return null;
  const expected = Buffer.from(sign(`${emailB64}.${exp}`));
  const given = Buffer.from(mac);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  if (Number(exp) < Date.now()) return null;
  const email = Buffer.from(emailB64, "base64url").toString();
  // Removing an address from ADMIN_EMAILS revokes its sessions immediately.
  return adminEmails().includes(email) ? email : null;
}

export async function requireAdmin() {
  const email = await getAdminEmail();
  if (!email) redirect("/admin/login");
  return email;
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}
