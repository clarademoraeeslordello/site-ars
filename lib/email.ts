import "server-only";
import { getResendClient } from "@/lib/resend";
import { SITE_URL } from "@/lib/site";

const FROM = () => process.env.RESEND_FROM_EMAIL ?? "ARS <onboarding@resend.dev>";
// The newsletter goes out from its own address, separate from product and admin e-mails.
const NEWSLETTER_FROM = () => process.env.NEWSLETTER_FROM_EMAIL ?? FROM();

export function adminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function layout(body: string) {
  return `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#1b1b1b;max-width:560px">${body}<p style="color:#6e6e73;font-size:12px;margin-top:32px">Audit Cockpits · ${escapeHtml(SITE_URL.replace(/^https?:\/\//, ""))}</p></div>`;
}

function button(href: string, label: string) {
  return `<p><a href="${escapeHtml(href)}" style="display:inline-block;background:#c4a24e;color:#161618;padding:10px 18px;border-radius:10px;text-decoration:none;font-weight:600">${escapeHtml(label)}</a></p>`;
}

async function send(args: { from?: string; to: string | string[]; subject: string; html: string; headers?: Record<string, string> }) {
  const { error } = await getResendClient().emails.send({ from: args.from ?? FROM(), ...args });
  if (error) throw new Error(`Resend: ${error.message}`);
}

export async function sendMagicLink(to: string, link: string) {
  await send({
    to,
    subject: "Seu link de acesso ao painel do ISO Radar",
    html: layout(
      `<p>Use o botão abaixo para entrar no painel. O link vale por 15 minutos e só funciona uma vez.</p>${button(link, "Entrar no painel")}<p style="color:#6e6e73;font-size:13px">Se você não pediu este acesso, ignore este e-mail.</p>`
    ),
  });
}

export async function sendReviewDigest(titles: string[]) {
  const to = adminEmails();
  if (!to.length) return;
  const items = titles.map((t) => `<li>${escapeHtml(t)}</li>`).join("");
  await send({
    to,
    subject: `ISO Radar: ${titles.length} rascunho${titles.length > 1 ? "s" : ""} para revisar`,
    html: layout(
      `<p>A varredura de hoje encontrou mudanças nas normas monitoradas. Os rascunhos estão prontos em PT, EN e ES:</p><ul>${items}</ul>${button(`${SITE_URL}/admin/radar`, "Abrir a fila de revisão")}`
    ),
  });
}

export async function sendEditionReady(month: string, count: number) {
  const to = adminEmails();
  if (!to.length) return;
  await send({
    to,
    subject: `ISO Radar: edição de ${month} pronta para aprovar`,
    html: layout(
      `<p>A edição mensal da newsletter foi montada com ${count} artigo${count > 1 ? "s" : ""} publicado${count > 1 ? "s" : ""}. Nada é enviado até você aprovar.</p>${button(`${SITE_URL}/admin/newsletter`, "Revisar a edição")}`
    ),
  });
}

const CONFIRM_COPY = {
  "pt-br": {
    subject: "Confirme sua inscrição no ISO Radar",
    text: "Falta um passo: confirme que quer receber o ISO Radar, a edição mensal com as mudanças nas normas ISO e o link da fonte oficial.",
    button: "Confirmar inscrição",
    ignore: "Se você não se inscreveu, ignore este e-mail.",
  },
  en: {
    subject: "Confirm your ISO Radar subscription",
    text: "One more step: confirm you want to receive ISO Radar, the monthly edition with changes to ISO standards and a link to the official source.",
    button: "Confirm subscription",
    ignore: "If you did not sign up, ignore this e-mail.",
  },
  es: {
    subject: "Confirma tu suscripción a ISO Radar",
    text: "Falta un paso: confirma que quieres recibir ISO Radar, la edición mensual con los cambios en las normas ISO y el enlace a la fuente oficial.",
    button: "Confirmar suscripción",
    ignore: "Si no te suscribiste, ignora este correo.",
  },
} as const;

export type MailLocale = keyof typeof CONFIRM_COPY;

export async function sendSubscriptionConfirm(to: string, locale: MailLocale, token: string) {
  const c = CONFIRM_COPY[locale];
  await send({
    from: NEWSLETTER_FROM(),
    to,
    subject: c.subject,
    html: layout(
      `<p>${c.text}</p>${button(`${SITE_URL}/api/newsletter/confirm/?token=${encodeURIComponent(token)}`, c.button)}<p style="color:#6e6e73;font-size:13px">${c.ignore}</p>`
    ),
  });
}

export async function sendNewsletterEdition(args: { to: string; subject: string; html: string; unsubscribeUrl: string }) {
  await send({
    from: NEWSLETTER_FROM(),
    to: args.to,
    subject: args.subject,
    html: layout(args.html),
    headers: { "List-Unsubscribe": `<${args.unsubscribeUrl}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
  });
}
