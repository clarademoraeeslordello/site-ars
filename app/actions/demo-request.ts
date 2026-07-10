"use server";

import { getResendClient } from "@/lib/resend";
import { demoRequestSchema, type DemoRequestData } from "@/lib/validations/demo-request";

export type SubmitDemoRequestResult = { ok: true } | { ok: false; error: string };

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function submitDemoRequest(
  data: DemoRequestData
): Promise<SubmitDemoRequestResult> {
  const parsed = demoRequestSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, error: "invalid_payload" };
  }
  const d = parsed.data;

  const toEmail = process.env.DEMO_REQUEST_TO_EMAIL;
  if (!toEmail) {
    console.error("DEMO_REQUEST_TO_EMAIL is not set");
    return { ok: false, error: "not_configured" };
  }

  const rows = [
    ["Nome", d.name],
    ["E-mail", d.email],
    ["Empresa", d.company],
    ["Cargo", d.role],
    ["Colaboradores", d.employees],
    ["País", d.country],
    ["Frameworks", d.frameworks.join(", ")],
    ["Mensagem", d.message?.trim() || "(não informado)"],
  ];

  const html = `
    <h2 style="font-family:Georgia,serif;">Nova solicitação de demonstração</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      ${rows
        .map(
          ([label, value]) => `
        <tr>
          <td style="color:#6e6e73;padding-right:12px;white-space:nowrap;">${escapeHtml(label)}</td>
          <td style="font-weight:600;">${escapeHtml(value).replace(/\n/g, "<br/>")}</td>
        </tr>`
        )
        .join("")}
    </table>
  `;

  try {
    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "ARS <onboarding@resend.dev>",
      to: toEmail,
      replyTo: d.email,
      subject: `Nova solicitação de demonstração: ${d.company}`,
      html,
    });

    if (error) {
      console.error("Resend error", error);
      return { ok: false, error: "send_failed" };
    }

    return { ok: true };
  } catch (err) {
    console.error("submitDemoRequest failed", err);
    return { ok: false, error: "send_failed" };
  }
}
