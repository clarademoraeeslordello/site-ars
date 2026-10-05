/*
 * Institutional site database (Railway Postgres, separate from the ARS app).
 * Model from docs/design-handoff/reference/"Fase 2 - Arquitetura do Site" section 06.
 *
 * Security notes:
 * - Newsletter and admin tokens are stored only as SHA-256 hashes, never in clear text.
 * - consent_events is append-only (UPDATE/DELETE blocked by a trigger in the migration):
 *   it is the LGPD record of who consented to what, when and with which text version.
 * - IPs are stored hashed (with a server secret), not raw.
 */
import { sql } from "drizzle-orm";
import {
  bigserial,
  check,
  date,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

const createdAt = () => timestamp("created_at", { withTimezone: true }).notNull().defaultNow();
const updatedAt = () => timestamp("updated_at", { withTimezone: true }).notNull().defaultNow();

export const LOCALES = ["pt-BR", "en", "es"] as const;

// ── Newsletter ──────────────────────────────────────────────────────────────

export const newsletterSubscribers = pgTable(
  "newsletter_subscribers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull(),
    name: text("name"),
    locale: text("locale").notNull().default("pt-BR"),
    status: text("status").notNull().default("pending"), // pending | active | unsubscribed
    topics: text("topics").array().notNull().default(sql`'{}'::text[]`),
    consentTextVersion: text("consent_text_version").notNull(),
    consentAt: timestamp("consent_at", { withTimezone: true }).notNull(),
    confirmTokenHash: text("confirm_token_hash"),
    confirmTokenExpiresAt: timestamp("confirm_token_expires_at", { withTimezone: true }),
    manageTokenHash: text("manage_token_hash").notNull(),
    source: text("source").notNull(), // home | radar_article | footer | demo
    sourcePath: text("source_path"),
    createdAt: createdAt(),
    confirmedAt: timestamp("confirmed_at", { withTimezone: true }),
    unsubscribedAt: timestamp("unsubscribed_at", { withTimezone: true }),
    updatedAt: updatedAt(),
  },
  (t) => [
    // One row per address, case-insensitive.
    uniqueIndex("newsletter_subscribers_email_lower_uq").on(sql`lower(${t.email})`),
    uniqueIndex("newsletter_subscribers_manage_token_uq").on(t.manageTokenHash),
    index("newsletter_subscribers_confirm_token_idx").on(t.confirmTokenHash),
    index("newsletter_subscribers_status_locale_idx").on(t.status, t.locale),
    check("newsletter_subscribers_status_ck", sql`${t.status} in ('pending','active','unsubscribed')`),
    check("newsletter_subscribers_locale_ck", sql`${t.locale} in ('pt-BR','en','es')`),
  ]
);

export const consentEvents = pgTable(
  "consent_events",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    // No foreign key on purpose: deleting a subscriber (e.g. an LGPD erasure request) must not
    // touch this append-only record, which keeps the proof of consent.
    subscriberId: uuid("subscriber_id"),
    email: text("email").notNull(),
    // subscribe_requested | confirmed | preferences_updated | unsubscribed
    event: text("event").notNull(),
    consentTextVersion: text("consent_text_version"),
    locale: text("locale"),
    sourcePath: text("source_path"),
    ipHash: text("ip_hash"),
    userAgent: text("user_agent"),
    createdAt: createdAt(),
  },
  (t) => [
    index("consent_events_subscriber_idx").on(t.subscriberId),
    index("consent_events_email_lower_idx").on(sql`lower(${t.email})`),
    check(
      "consent_events_event_ck",
      sql`${t.event} in ('subscribe_requested','confirmed','preferences_updated','unsubscribed')`
    ),
  ]
);

export const newsletterEditions = pgTable(
  "newsletter_editions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    locale: text("locale").notNull(),
    period: text("period").notNull(), // e.g. 2026-10
    title: text("title").notNull(),
    intro: text("intro"),
    articleGroupIds: uuid("article_group_ids").array().notNull().default(sql`'{}'::uuid[]`),
    status: text("status").notNull().default("draft"), // draft | approved | sent
    sentAt: timestamp("sent_at", { withTimezone: true }),
    providerRef: text("provider_ref"),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    uniqueIndex("newsletter_editions_locale_period_uq").on(t.locale, t.period),
    check("newsletter_editions_status_ck", sql`${t.status} in ('draft','approved','sent')`),
  ]
);

// ── Demo requests ───────────────────────────────────────────────────────────

export const demoRequests = pgTable(
  "demo_requests",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    company: text("company").notNull(),
    role: text("role").notNull(),
    employees: text("employees").notNull(),
    country: text("country").notNull(),
    frameworks: text("frameworks").array().notNull().default(sql`'{}'::text[]`),
    message: text("message"),
    locale: text("locale"),
    sourcePath: text("source_path"),
    notifiedAt: timestamp("notified_at", { withTimezone: true }),
    createdAt: createdAt(),
  },
  (t) => [index("demo_requests_created_idx").on(t.createdAt)]
);

// ── ISO Radar ───────────────────────────────────────────────────────────────

/** Standards monitored by the daily scan, with the last state read from ISO.org. */
export const radarStandards = pgTable(
  "radar_standards",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    code: text("code").notNull(), // e.g. ISO 9001
    title: text("title"),
    isoUrl: text("iso_url").notNull(), // official ISO.org page
    lastEdition: text("last_edition"), // e.g. ISO 9001:2026
    lastStage: text("last_stage"), // lifecycle stage as published by ISO
    lastCheckedAt: timestamp("last_checked_at", { withTimezone: true }),
    active: integer("active").notNull().default(1),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [uniqueIndex("radar_standards_code_uq").on(t.code)]
);

/** Log of each daily scan. */
export const radarScans = pgTable("radar_scans", {
  id: uuid("id").primaryKey().defaultRandom(),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
  finishedAt: timestamp("finished_at", { withTimezone: true }),
  standardsChecked: integer("standards_checked").notNull().default(0),
  changesFound: integer("changes_found").notNull().default(0),
  status: text("status").notNull().default("running"), // running | ok | failed
  error: text("error"),
});

/** ISO Radar articles; group_id links the PT/EN/ES versions. Only status=published is public. */
export const radarArticles = pgTable(
  "radar_articles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    groupId: uuid("group_id").notNull(),
    locale: text("locale").notNull(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    summary: text("summary").notNull(),
    bodyMd: text("body_md").notNull(),
    // new_edition | amendment | revision | withdrawal | transition | new_standard
    category: text("category").notNull(),
    standards: text("standards").array().notNull().default(sql`'{}'::text[]`),
    // published | under_review | in_transition | withdrawn
    standardStatus: text("standard_status").notNull(),
    sourceUrl: text("source_url").notNull(),
    sourceTitle: text("source_title"),
    sourceDate: date("source_date"),
    verifiedAt: timestamp("verified_at", { withTimezone: true }),
    status: text("status").notNull().default("draft"), // draft | in_review | published | archived
    authorName: text("author_name"), // real person or empty
    reviewedBy: text("reviewed_by"),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    scanId: uuid("scan_id").references(() => radarScans.id, { onDelete: "set null" }),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    uniqueIndex("radar_articles_locale_slug_uq").on(t.locale, t.slug),
    uniqueIndex("radar_articles_group_locale_uq").on(t.groupId, t.locale),
    index("radar_articles_status_published_idx").on(t.status, t.publishedAt),
    check("radar_articles_locale_ck", sql`${t.locale} in ('pt-BR','en','es')`),
    check("radar_articles_status_ck", sql`${t.status} in ('draft','in_review','published','archived')`),
    check(
      "radar_articles_category_ck",
      sql`${t.category} in ('new_edition','amendment','revision','withdrawal','transition','new_standard')`
    ),
    check(
      "radar_articles_standard_status_ck",
      sql`${t.standardStatus} in ('published','under_review','in_transition','withdrawn')`
    ),
  ]
);

// ── Admin (magic link) ──────────────────────────────────────────────────────

/** One-time login links for /admin, sent by email to addresses in ADMIN_EMAILS. */
export const adminLoginTokens = pgTable(
  "admin_login_tokens",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull(),
    tokenHash: text("token_hash").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    usedAt: timestamp("used_at", { withTimezone: true }),
    ipHash: text("ip_hash"),
    createdAt: createdAt(),
  },
  (t) => [
    uniqueIndex("admin_login_tokens_hash_uq").on(t.tokenHash),
    index("admin_login_tokens_email_created_idx").on(t.email, t.createdAt),
  ]
);
