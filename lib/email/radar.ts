import "server-only";
import { SITE_URL } from "@/lib/site";
import { emailSender } from "./sender";
import { emailLayout, emailText } from "./templates";

/** Addresses allowed into /admin (comma-separated ADMIN_EMAILS). */
export function adminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

async function send(args: {
  to: string;
  subject: string;
  heading: string;
  paragraphs: string[];
  cta?: { label: string; url: string };
  footer?: string[];
  tag: string;
}) {
  const footer = args.footer ?? ["Audit Cockpits · auditcockpits.com"];
  const result = await emailSender.send({
    to: args.to,
    subject: args.subject,
    html: emailLayout({ preheader: args.subject, heading: args.heading, paragraphs: args.paragraphs, cta: args.cta, footer }),
    text: emailText(args.heading, args.paragraphs, args.cta, footer),
    tag: args.tag,
  });
  if (!result.ok) throw new Error(`email: ${result.error}`);
}

export async function sendMagicLink(to: string, link: string) {
  await send({
    to,
    subject: "Seu link de acesso ao painel do ISO Radar",
    heading: "Entrar no painel",
    paragraphs: ["Use o botão abaixo para entrar no painel do ISO Radar. O link vale por 15 minutos e só funciona uma vez."],
    cta: { label: "Entrar no painel", url: link },
    footer: ["Se você não pediu este acesso, ignore este e-mail."],
    tag: "admin_login",
  });
}

export async function sendReviewDigest(titles: string[]) {
  const n = titles.length;
  for (const to of adminEmails()) {
    await send({
      to,
      subject: `ISO Radar: ${n} rascunho${n > 1 ? "s" : ""} para revisar`,
      heading: "Novos rascunhos no ISO Radar",
      paragraphs: [
        "A varredura de hoje encontrou mudanças nas normas monitoradas. Os rascunhos estão prontos em PT, EN e ES:",
        ...titles.map((t) => `• ${t}`),
      ],
      cta: { label: "Abrir a fila de revisão", url: `${SITE_URL}/admin/radar` },
      tag: "radar_digest",
    });
  }
}

export async function sendEditionReady(period: string, count: number) {
  for (const to of adminEmails()) {
    await send({
      to,
      subject: `ISO Radar: edição de ${period} pronta para aprovar`,
      heading: `Edição de ${period}`,
      paragraphs: [
        `A edição mensal da newsletter foi montada com ${count} artigo${count > 1 ? "s" : ""} publicado${count > 1 ? "s" : ""}, em PT, EN e ES. Nada é enviado até você aprovar.`,
      ],
      cta: { label: "Revisar a edição", url: `${SITE_URL}/admin/newsletter` },
      tag: "newsletter_edition_ready",
    });
  }
}
