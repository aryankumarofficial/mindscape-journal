import {
  pgTable,
  uuid,
  text,
  index
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { journalEntries } from "./journal-entries";

export const keywords = pgTable(
  "keywords",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    journalId: uuid("journal_id")
      .references(() => journalEntries.id)
      .notNull(),

    keyword: text("keyword").notNull()
  },
  (table) => ([
index("keywords_journal_idx").on(table.journalId),
index("keywords_keyword_idx").on(table.keyword)
  ])
);

export const keywordsRelations = relations(
  keywords,
  ({ one }) => ({
    journalEntry: one(journalEntries, {
      fields: [keywords.journalId],
      references: [journalEntries.id]
    })
  })
);
