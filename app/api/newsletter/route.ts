import { z } from "zod";
import { requestSubscription } from "@/lib/newsletter";
import { newsletterEnabled } from "@/lib/email/sender";
import { clientIp, rateLimit } from "@/lib/security";

// POST /api/newsletter · ISO Radar subscription (double opt-in).
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  locale: z.enum(["pt-br", "en", "es"]),
  consent: z.literal(true),
  sourcePath: z.string().max(300).optional(),
  // Honeypot: real people never see or fill this field.
  website: z.string().max(0).optional(),
});

const MAX_BODY_BYTES = 4_000;

export async function POST(request: Request) {
  if (!newsletterEnabled()) return Response.json({ ok: false, error: "not_configured" }, { status: 503 });

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return Response.json({ ok: false, error: "too_large" }, { status: 413 });

  // 5 attempts per IP every 10 minutes.
  const ip = await clientIp();
  if (!rateLimit(`newsletter:${ip}`, 5, 10 * 60 * 1000)) {
    return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    // A filled honeypot gets a normal-looking answer, so bots learn nothing.
    const honeypot = (body as { website?: unknown })?.website;
    if (typeof honeypot === "string" && honeypot.length > 0) return Response.json({ ok: true });
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // 3 requests per address per hour, against confirmation-email abuse.
  if (!rateLimit(`newsletter-email:${parsed.data.email.toLowerCase()}`, 3, 60 * 60 * 1000)) {
    return Response.json({ ok: true });
  }

  try {
    const result = await requestSubscription({
      name: parsed.data.name,
      email: parsed.data.email,
      locale: parsed.data.locale,
      source: parsed.data.sourcePath?.includes("iso-radar") ? "radar_article" : "home",
      sourcePath: parsed.data.sourcePath ?? null,
    });
    return result.ok
      ? Response.json({ ok: true })
      : Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  } catch (err) {
    console.error("newsletter subscription failed", (err as Error).name);
    return Response.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
