import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

/*
 * ISO Radar + newsletter tables. Every table is prefixed (radar_, newsletter_, admin_) so they
 * live side by side with anything else in the same Postgres database.
 */

/** Last known state of every ISO deliverable we watch (one row per ISO Open Data id). */
export const radarDeliverables = pgTable(
  "radar_deliverables",
  {
    isoId: integer("iso_id").primaryKey(),
    family: text("family").notNull(), // catalog key, e.g. "iso-9001"
    reference: text("reference").notNull(), // e.g. "ISO 9001:2026"
    titleEn: text("title_en"),
    stage: integer("stage").notNull(), // harmonized stage code as an integer, 6060 = 60.60
    publicationDate: text("publication_date"),
    edition: integer("edition"),
    replaces: jsonb("replaces").$type<number[]>(),
    replacedBy: jsonb("replaced_by").$type<number[]>(),
    firstSeenAt: timestamp("first_seen_at", { withTimezone: true }).notNull().defaultNow(),
    lastCheckedAt: timestamp("last_checked_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("radar_deliverables_family_idx").on(t.family)]
);

export const radarScans = pgTable("radar_scans", {
  id: serial("id").primaryKey(),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
  finishedAt: timestamp("finished_at", { withTimezone: true }),
  checked: integer("checked").notNull().default(0),
  changes: integer("changes").notNull().default(0),
  ok: boolean("ok"),
  error: text("error"),
});

export const articleStatus = pgEnum("radar_article_status", [
  "draft", // waiting for review
  "published",
  "discarded",
]);

/** Editorial status shown on the site, following the ISO lifecycle. */
export const lifecycleStatus = pgEnum("radar_lifecycle_status", [
  "published", // Publicado
  "under_review", // Em revisão (new edition or amendment under development)
  "transition", // Em transição (new edition replaced the previous one)
  "withdrawn", // Retirado
]);

export type ArticleBody = {
  title: string;
  summary: string;
  whatHappened: string;
  whatChanged: string;
  impact: string;
  watch: string;
};

export type ArticleLocale = "pt-br" | "en" | "es";

export const radarArticles = pgTable(
  "radar_articles",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    family: text("family").notNull(),
    standard: text("standard").notNull(), // display name, e.g. "ISO 9001"
    isoId: integer("iso_id").notNull(), // deliverable the article is about
    reference: text("reference").notNull(),
    changeKind: text("change_kind").notNull(), // new_project | stage_change | published | withdrawn | replaced
    stageFrom: integer("stage_from"),
    stageTo: integer("stage_to").notNull(),
    lifecycle: lifecycleStatus("lifecycle").notNull(),
    status: articleStatus("status").notNull().default("draft"),
    content: jsonb("content").$type<Record<ArticleLocale, ArticleBody>>().notNull(),
    sourceUrl: text("source_url").notNull(),
    sourceDate: text("source_date"), // date the ISO published the change, when known
    transitionDeadline: text("transition_deadline"), // null = "a confirmar"
    transitionSource: text("transition_source"),
    detectedAt: timestamp("detected_at", { withTimezone: true }).notNull().defaultNow(),
    lastVerifiedAt: timestamp("last_verified_at", { withTimezone: true }).notNull().defaultNow(),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    reviewedBy: text("reviewed_by"),
  },
  (t) => [
    uniqueIndex("radar_articles_slug_idx").on(t.slug),
    index("radar_articles_status_idx").on(t.status),
  ]
);

export const newsletterSubscribers = pgTable(
  "newsletter_subscribers",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    name: text("name").notNull(),
    locale: text("locale").notNull(),
    status: text("status").notNull().default("pending"), // pending | confirmed | unsubscribed
    token: text("token").notNull(), // confirm + unsubscribe link token
    sourcePage: text("source_page"),
    consentAt: timestamp("consent_at", { withTimezone: true }).notNull().defaultNow(),
    confirmedAt: timestamp("confirmed_at", { withTimezone: true }),
    unsubscribedAt: timestamp("unsubscribed_at", { withTimezone: true }),
  },
  (t) => [uniqueIndex("newsletter_subscribers_email_idx").on(t.email), uniqueIndex("newsletter_subscribers_token_idx").on(t.token)]
);

export const newsletterEditions = pgTable("newsletter_editions", {
  id: serial("id").primaryKey(),
  month: text("month").notNull().unique(), // "2026-09"
  articleIds: jsonb("article_ids").$type<number[]>().notNull(),
  status: text("status").notNull().default("draft"), // draft | sent | discarded
  sentAt: timestamp("sent_at", { withTimezone: true }),
  sentCount: integer("sent_count"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const adminLoginTokens = pgTable("admin_login_tokens", {
  tokenHash: text("token_hash").primaryKey(),
  email: text("email").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  usedAt: timestamp("used_at", { withTimezone: true }),
});

export type RadarArticle = typeof radarArticles.$inferSelect;
export type RadarDeliverable = typeof radarDeliverables.$inferSelect;
