"use server";

import { getDb } from "@/db/client";
import { demoRequests } from "@/db/schema";
import { emailSender } from "@/lib/email/sender";
import { esc } from "@/lib/email/templates";
import { dbLocale } from "@/lib/consent";
import { clientIp, rateLimit } from "@/lib/security";
import { demoRequestSchema, type DemoRequestData } from "@/lib/validations/demo-request";
import { eq } from "drizzle-orm";

export type SubmitDemoRequestResult = { ok: true } | { ok: false; error: string };

/**
 * Demo request: saved in Postgres first (so no request is lost), then the team is notified by
 * email when sending is configured. Validation, size limits, honeypot and per-IP rate limit.
 */
export async function submitDemoRequest(
  data: DemoRequestData,
  context: { locale?: string; sourcePath?: string } = {}
): Promise<SubmitDemoRequestResult> {
  const parsed = demoRequestSchema.safeParse(data);
  if (!parsed.success) {
    // Filled honeypot: pretend success so bots learn nothing.
    if (typeof data?.website === "string" && data.website.length > 0) return { ok: true };
    return { ok: false, error: "invalid_payload" };
  }
  const d = parsed.data;

  // 5 requests per IP per hour.
  if (!rateLimit(`demo:${await clientIp()}`, 5, 60 * 60 * 1000)) return { ok: false, error: "rate_limited" };

  let id: string | null = null;
  if (process.env.DATABASE_URL) {
    try {
      const [row] = await getDb()
        .insert(demoRequests)
        .values({
          name: d.name,
          email: d.email,
          company: d.company,
          role: d.role,
          employees: d.employees,
          country: d.country,
          frameworks: d.frameworks,
          message: d.message?.trim() || null,
          locale: context.locale ? dbLocale(context.locale) : null,
          sourcePath: context.sourcePath?.slice(0, 300) ?? null,
        })
        .returning({ id: demoRequests.id });
      id = row.id;
    } catch (err) {
      console.error("demo request insert failed", (err as Error).name);
    }
  }

  const notified = await notifyTeam(d);
  if (id && notified) {
    await getDb().update(demoRequests).set({ notifiedAt: new Date() }).where(eq(demoRequests.id, id));
  }

  // Success when the request is stored or the team was notified.
  return id || notified ? { ok: true } : { ok: false, error: "send_failed" };
}

async function notifyTeam(d: DemoRequestData) {
  const to = process.env.DEMO_REQUEST_TO_EMAIL;
  if (!to || !emailSender.configured) return false;
  const rows: [string, string][] = [
    ["Nome", d.name],
    ["E-mail", d.email],
    ["Empresa", d.company],
    ["Cargo", d.role],
    ["Colaboradores", d.employees],
    ["País", d.country],
    ["Frameworks", d.frameworks.join(", ")],
    ["Mensagem", d.message?.trim() || "(não informado)"],
  ];
  const html = `<h2 style="font-family:Georgia,serif;">Nova solicitação de demonstração</h2>
<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="color:#807b6e;padding-right:12px;white-space:nowrap;vertical-align:top;">${esc(label)}</td><td style="font-weight:600;">${esc(value).replace(/\n/g, "<br/>")}</td></tr>`
    )
    .join("")}</table>`;
  const text = rows.map(([l, v]) => `${l}: ${v}`).join("\n");
  const result = await emailSender.send({
    to,
    replyTo: d.email,
    subject: `Nova solicitação de demonstração: ${d.company}`,
    html,
    text,
    tag: "demo_request",
  });
  return result.ok;
}
