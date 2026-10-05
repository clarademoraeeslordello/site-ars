CREATE TABLE "admin_login_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"token_hash" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"used_at" timestamp with time zone,
	"ip_hash" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "consent_events" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"subscriber_id" uuid,
	"email" text NOT NULL,
	"event" text NOT NULL,
	"consent_text_version" text,
	"locale" text,
	"source_path" text,
	"ip_hash" text,
	"user_agent" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "consent_events_event_ck" CHECK ("consent_events"."event" in ('subscribe_requested','confirmed','preferences_updated','unsubscribed'))
);
--> statement-breakpoint
CREATE TABLE "demo_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"company" text NOT NULL,
	"role" text NOT NULL,
	"employees" text NOT NULL,
	"country" text NOT NULL,
	"frameworks" text[] DEFAULT '{}'::text[] NOT NULL,
	"message" text,
	"locale" text,
	"source_path" text,
	"notified_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "newsletter_editions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"locale" text NOT NULL,
	"period" text NOT NULL,
	"title" text NOT NULL,
	"intro" text,
	"article_group_ids" uuid[] DEFAULT '{}'::uuid[] NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"sent_at" timestamp with time zone,
	"provider_ref" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "newsletter_editions_status_ck" CHECK ("newsletter_editions"."status" in ('draft','approved','sent'))
);
--> statement-breakpoint
CREATE TABLE "newsletter_subscribers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"locale" text DEFAULT 'pt-BR' NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"topics" text[] DEFAULT '{}'::text[] NOT NULL,
	"consent_text_version" text NOT NULL,
	"consent_at" timestamp with time zone NOT NULL,
	"confirm_token_hash" text,
	"confirm_token_expires_at" timestamp with time zone,
	"manage_token_hash" text NOT NULL,
	"source" text NOT NULL,
	"source_path" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"confirmed_at" timestamp with time zone,
	"unsubscribed_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "newsletter_subscribers_status_ck" CHECK ("newsletter_subscribers"."status" in ('pending','active','unsubscribed')),
	CONSTRAINT "newsletter_subscribers_locale_ck" CHECK ("newsletter_subscribers"."locale" in ('pt-BR','en','es'))
);
--> statement-breakpoint
CREATE TABLE "radar_articles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"group_id" uuid NOT NULL,
	"locale" text NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"summary" text NOT NULL,
	"body_md" text NOT NULL,
	"category" text NOT NULL,
	"standards" text[] DEFAULT '{}'::text[] NOT NULL,
	"standard_status" text NOT NULL,
	"source_url" text NOT NULL,
	"source_title" text,
	"source_date" date,
	"verified_at" timestamp with time zone,
	"status" text DEFAULT 'draft' NOT NULL,
	"author_name" text,
	"reviewed_by" text,
	"seo_title" text,
	"seo_description" text,
	"scan_id" uuid,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "radar_articles_locale_ck" CHECK ("radar_articles"."locale" in ('pt-BR','en','es')),
	CONSTRAINT "radar_articles_status_ck" CHECK ("radar_articles"."status" in ('draft','in_review','published','archived')),
	CONSTRAINT "radar_articles_category_ck" CHECK ("radar_articles"."category" in ('new_edition','amendment','revision','withdrawal','transition','new_standard')),
	CONSTRAINT "radar_articles_standard_status_ck" CHECK ("radar_articles"."standard_status" in ('published','under_review','in_transition','withdrawn'))
);
--> statement-breakpoint
CREATE TABLE "radar_scans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"finished_at" timestamp with time zone,
	"standards_checked" integer DEFAULT 0 NOT NULL,
	"changes_found" integer DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'running' NOT NULL,
	"error" text
);
--> statement-breakpoint
CREATE TABLE "radar_standards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"title" text,
	"iso_url" text NOT NULL,
	"last_edition" text,
	"last_stage" text,
	"last_checked_at" timestamp with time zone,
	"active" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "radar_articles" ADD CONSTRAINT "radar_articles_scan_id_radar_scans_id_fk" FOREIGN KEY ("scan_id") REFERENCES "public"."radar_scans"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "admin_login_tokens_hash_uq" ON "admin_login_tokens" USING btree ("token_hash");--> statement-breakpoint
CREATE INDEX "admin_login_tokens_email_created_idx" ON "admin_login_tokens" USING btree ("email","created_at");--> statement-breakpoint
CREATE INDEX "consent_events_subscriber_idx" ON "consent_events" USING btree ("subscriber_id");--> statement-breakpoint
CREATE INDEX "consent_events_email_lower_idx" ON "consent_events" USING btree (lower("email"));--> statement-breakpoint
CREATE INDEX "demo_requests_created_idx" ON "demo_requests" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "newsletter_editions_locale_period_uq" ON "newsletter_editions" USING btree ("locale","period");--> statement-breakpoint
CREATE UNIQUE INDEX "newsletter_subscribers_email_lower_uq" ON "newsletter_subscribers" USING btree (lower("email"));--> statement-breakpoint
CREATE UNIQUE INDEX "newsletter_subscribers_manage_token_uq" ON "newsletter_subscribers" USING btree ("manage_token_hash");--> statement-breakpoint
CREATE INDEX "newsletter_subscribers_confirm_token_idx" ON "newsletter_subscribers" USING btree ("confirm_token_hash");--> statement-breakpoint
CREATE INDEX "newsletter_subscribers_status_locale_idx" ON "newsletter_subscribers" USING btree ("status","locale");--> statement-breakpoint
CREATE UNIQUE INDEX "radar_articles_locale_slug_uq" ON "radar_articles" USING btree ("locale","slug");--> statement-breakpoint
CREATE UNIQUE INDEX "radar_articles_group_locale_uq" ON "radar_articles" USING btree ("group_id","locale");--> statement-breakpoint
CREATE INDEX "radar_articles_status_published_idx" ON "radar_articles" USING btree ("status","published_at");--> statement-breakpoint
CREATE UNIQUE INDEX "radar_standards_code_uq" ON "radar_standards" USING btree ("code");