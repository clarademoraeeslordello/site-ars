"use server";

import { z } from "zod";
import { hasDb } from "@/lib/radar/queries";
import { toDbLocale } from "@/lib/radar/content";
import { subscribe } from "@/lib/newsletter";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  locale: z.enum(["pt-br", "en", "es"]),
  consent: z.boolean().refine((v) => v),
  sourcePage: z.string().max(300).optional(),
});

export type SubscribeResult = { ok: true } | { ok: false; error: "invalid" | "unavailable" };

export async function subscribeToRadar(input: z.input<typeof schema>): Promise<SubscribeResult> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };
  if (!hasDb()) return { ok: false, error: "unavailable" };
  try {
    const { name, email, locale, sourcePage } = parsed.data;
    await subscribe({ name, email, locale: toDbLocale(locale), sourcePath: sourcePage });
    return { ok: true };
  } catch (err) {
    console.error("[newsletter] subscribe failed", err);
    return { ok: false, error: "unavailable" };
  }
}
