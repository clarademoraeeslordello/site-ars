CREATE TYPE "public"."radar_article_status" AS ENUM('draft', 'published', 'discarded');--> statement-breakpoint
CREATE TYPE "public"."radar_lifecycle_status" AS ENUM('published', 'under_review', 'transition', 'withdrawn');--> statement-breakpoint
CREATE TABLE "admin_login_tokens" (
	"token_hash" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"used_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "newsletter_editions" (
	"id" serial PRIMARY KEY NOT NULL,
	"month" text NOT NULL,
	"article_ids" jsonb NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"sent_at" timestamp with time zone,
	"sent_count" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "newsletter_editions_month_unique" UNIQUE("month")
);
--> statement-breakpoint
CREATE TABLE "newsletter_subscribers" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"locale" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"token" text NOT NULL,
	"source_page" text,
	"consent_at" timestamp with time zone DEFAULT now() NOT NULL,
	"confirmed_at" timestamp with time zone,
	"unsubscribed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "radar_articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"family" text NOT NULL,
	"standard" text NOT NULL,
	"iso_id" integer NOT NULL,
	"reference" text NOT NULL,
	"change_kind" text NOT NULL,
	"stage_from" integer,
	"stage_to" integer NOT NULL,
	"lifecycle" "radar_lifecycle_status" NOT NULL,
	"status" "radar_article_status" DEFAULT 'draft' NOT NULL,
	"content" jsonb NOT NULL,
	"source_url" text NOT NULL,
	"source_date" text,
	"transition_deadline" text,
	"transition_source" text,
	"detected_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_verified_at" timestamp with time zone DEFAULT now() NOT NULL,
	"published_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"reviewed_by" text
);
--> statement-breakpoint
CREATE TABLE "radar_deliverables" (
	"iso_id" integer PRIMARY KEY NOT NULL,
	"family" text NOT NULL,
	"reference" text NOT NULL,
	"title_en" text,
	"stage" integer NOT NULL,
	"publication_date" text,
	"edition" integer,
	"replaces" jsonb,
	"replaced_by" jsonb,
	"first_seen_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_checked_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "radar_scans" (
	"id" serial PRIMARY KEY NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"finished_at" timestamp with time zone,
	"checked" integer DEFAULT 0 NOT NULL,
	"changes" integer DEFAULT 0 NOT NULL,
	"ok" boolean,
	"error" text
);
--> statement-breakpoint
CREATE UNIQUE INDEX "newsletter_subscribers_email_idx" ON "newsletter_subscribers" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "newsletter_subscribers_token_idx" ON "newsletter_subscribers" USING btree ("token");--> statement-breakpoint
CREATE UNIQUE INDEX "radar_articles_slug_idx" ON "radar_articles" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "radar_articles_status_idx" ON "radar_articles" USING btree ("status");--> statement-breakpoint
CREATE INDEX "radar_deliverables_family_idx" ON "radar_deliverables" USING btree ("family");