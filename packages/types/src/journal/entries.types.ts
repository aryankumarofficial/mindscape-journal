import type { journalEntries } from "@repo/db/schema";
import type { RequireAtLeastOne } from "../generics";

export type InsertJournalEntry = typeof journalEntries.$inferInsert;

export type UpdateJournalEntry = {
  userId: string;
  id: string;
} & RequireAtLeastOne<Pick<InsertJournalEntry,"text" | "ambience">>
