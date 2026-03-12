CREATE TYPE "public"."verification_type" AS ENUM('EMAIL_VERIFY', 'PASSWORD_RESET', 'MAGIL_LINK');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar DEFAULT 'New User',
	"email" text NOT NULL,
	"passoword" text NOT NULL,
	"is_verified" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification_token" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token_hash" varchar(255) NOT NULL,
	"type" "verification_type" NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "verification_token" ADD CONSTRAINT "verification_token_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "verification_user_idx" ON "verification_token" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_expiry_idx" ON "verification_token" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "session_user_id_idx" ON "session" USING btree ("user_id");