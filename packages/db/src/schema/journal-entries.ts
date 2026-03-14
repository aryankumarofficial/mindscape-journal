import {
  pgTable,
  uuid,
  text,
  timestamp,
  index
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { users } from "./user";
import { journalAnalysis } from "./journal-analysis";

export const journalEntries = pgTable(
  "journal_entries",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    userId: uuid("user_id")
      .references(() => users.id)
      .notNull(),

    ambience: text("ambience").notNull(),

    text: text("text").notNull(),

    createdAt: timestamp("created_at").defaultNow()
  },
  (table) => ({
    userIdx: index("journal_user_idx").on(table.userId),

    createdIdx: index("journal_created_idx").on(table.createdAt),

    ambienceIdx: index("journal_ambience_idx").on(table.ambience)
  })
);

export const journalEntriesRelations = relations(
  journalEntries,
  ({ one, one: oneRelation, many }) => ({
    user: one(users, {
      fields: [journalEntries.userId],
      references: [users.id]
    }),

    analysis: oneRelation(journalAnalysis),

  })
);