import {
  pgTable,
  uuid,
  text,
  timestamp,
  jsonb,
  index
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { journalEntries } from "./journal-entries";

export const journalAnalysis = pgTable(
  "journal_analysis",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    journalId: uuid("journal_id")
      .references(() => journalEntries.id)
      .notNull()
      .unique(),

    emotion: text("emotion"),

    summary: text("summary"),

    keywords: jsonb("keywords").$type<string[]>(),

    createdAt: timestamp("created_at").defaultNow()
  },
  (table) => ([
    index("analysis_journal_idx").on(table.journalId),
    index("analysis_emotion_idx").on(table.emotion)
    ])
);

export const journalAnalysisRelations = relations(
  journalAnalysis,
  ({ one }) => ({
    journalEntry: one(journalEntries, {
      fields: [journalAnalysis.journalId],
      references: [journalEntries.id]
    })
  })
);
