import { index, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import  { users } from "./user";

export const textAnalysis = pgTable(
  "text-analyzer",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .references(() => users.id)
      .notNull(),
    input: text("input").notNull(),
    emotion: varchar("emotion").notNull(),
    keywords: text("keywords").array().notNull(),
    summary: text("summary").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(()=>new Date())
  }, (table => ([
    index("userId_idx").on(table.userId),
  ]))
)
