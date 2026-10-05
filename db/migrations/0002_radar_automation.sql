CREATE TABLE "radar_deliverables" (
	"iso_id" integer PRIMARY KEY NOT NULL,
	"family" text NOT NULL,
	"reference" text NOT NULL,
	"title_en" text,
	"stage" integer NOT NULL,
	"publication_date" date,
	"edition" integer,
	"replaces" integer[] DEFAULT '{}'::integer[] NOT NULL,
	"replaced_by" integer[] DEFAULT '{}'::integer[] NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_checked_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "radar_articles" ADD COLUMN "iso_id" integer;--> statement-breakpoint
ALTER TABLE "radar_articles" ADD COLUMN "reference" text;--> statement-breakpoint
ALTER TABLE "radar_articles" ADD COLUMN "change_kind" text;--> statement-breakpoint
ALTER TABLE "radar_articles" ADD COLUMN "stage_from" integer;--> statement-breakpoint
ALTER TABLE "radar_articles" ADD COLUMN "stage_to" integer;--> statement-breakpoint
ALTER TABLE "radar_articles" ADD COLUMN "transition_deadline" date;--> statement-breakpoint
ALTER TABLE "radar_articles" ADD COLUMN "transition_source" text;--> statement-breakpoint
CREATE INDEX "radar_deliverables_family_idx" ON "radar_deliverables" USING btree ("family");--> statement-breakpoint
CREATE INDEX "radar_articles_iso_stage_idx" ON "radar_articles" USING btree ("iso_id","stage_to");