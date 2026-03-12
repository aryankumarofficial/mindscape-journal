import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { session } from "./session";

export const users = pgTable(
  "users",
  {
    id: uuid().defaultRandom().primaryKey(),
    name:varchar("name").default("New User"),
    email: text("email").notNull().unique(),
    password: text("passoword").notNull(),
    isVerified: boolean("is_verified").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
  },
  (table) => ([
      index("users_email_idx").on(table.email)
  ]
  )
)

export const userRelations = relations(users, ({ many }) => ({
  sessions:many(session)
}))
