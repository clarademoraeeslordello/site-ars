import "server-only";
import { Resend } from "resend";

/**
 * Email provider boundary (Fase 2 architecture: "EmailSender"). The site talks to this
 * interface only, so the provider can change without touching forms or the data model.
 * Product emails (app.auditcockpits.com) and the newsletter stay separate: this sender is used
 * only by the institutional site.
 */
export type EmailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  headers?: Record<string, string>;
  tag?: string;
};

export interface EmailSender {
  readonly configured: boolean;
  send(message: EmailMessage): Promise<{ ok: true; id?: string } | { ok: false; error: string }>;
}

class ResendSender implements EmailSender {
  private client: Resend | null = null;

  get configured() {
    return Boolean(process.env.RESEND_API_KEY);
  }

  async send(message: EmailMessage) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return { ok: false as const, error: "not_configured" };
    this.client ??= new Resend(apiKey);
    try {
      const { data, error } = await this.client.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "Audit Cockpits <onboarding@resend.dev>",
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
        replyTo: message.replyTo,
        headers: message.headers,
        tags: message.tag ? [{ name: "category", value: message.tag }] : undefined,
      });
      if (error) {
        console.error("email send failed", error.name);
        return { ok: false as const, error: "send_failed" };
      }
      return { ok: true as const, id: data?.id };
    } catch (err) {
      console.error("email send threw", (err as Error).name);
      return { ok: false as const, error: "send_failed" };
    }
  }
}

/** Local development only (EMAIL_TRANSPORT=log): prints the email instead of sending it. */
class LogSender implements EmailSender {
  readonly configured = true;
  async send(message: EmailMessage) {
    console.log(`[email:log] to=${message.to} subject=${message.subject}
${message.text}`);
    return { ok: true as const };
  }
}

export const emailSender: EmailSender =
  process.env.EMAIL_TRANSPORT === "log" && process.env.NODE_ENV !== "production" ? new LogSender() : new ResendSender();

export function newsletterEnabled() {
  return emailSender.configured && Boolean(process.env.DATABASE_URL);
}
