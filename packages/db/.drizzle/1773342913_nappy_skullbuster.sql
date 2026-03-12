CREATE TABLE "ambience_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"ambience" text NOT NULL,
	"started_at" timestamp DEFAULT now(),
	"ended_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "journal_analysis" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"journal_id" uuid NOT NULL,
	"emotion" text,
	"summary" text,
	"keywords" jsonb,
	"model" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "journal_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"ambience" text NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "keywords" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"journal_id" uuid NOT NULL,
	"keyword" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ambience_sessions" ADD CONSTRAINT "ambience_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journal_analysis" ADD CONSTRAINT "journal_analysis_journal_id_journal_entries_id_fk" FOREIGN KEY ("journal_id") REFERENCES "public"."journal_entries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journal_entries" ADD CONSTRAINT "journal_entries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "keywords" ADD CONSTRAINT "keywords_journal_id_journal_entries_id_fk" FOREIGN KEY ("journal_id") REFERENCES "public"."journal_entries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "session_user_idx" ON "ambience_sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_ambience_idx" ON "ambience_sessions" USING btree ("ambience");--> statement-breakpoint
CREATE INDEX "analysis_journal_idx" ON "journal_analysis" USING btree ("journal_id");--> statement-breakpoint
CREATE INDEX "analysis_emotion_idx" ON "journal_analysis" USING btree ("emotion");--> statement-breakpoint
CREATE INDEX "journal_user_idx" ON "journal_entries" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "journal_created_idx" ON "journal_entries" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "journal_ambience_idx" ON "journal_entries" USING btree ("ambience");--> statement-breakpoint
CREATE INDEX "keywords_journal_idx" ON "keywords" USING btree ("journal_id");--> statement-breakpoint
CREATE INDEX "keywords_keyword_idx" ON "keywords" USING btree ("keyword");