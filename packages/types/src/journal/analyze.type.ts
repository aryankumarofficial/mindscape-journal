import type { journalAnalysis, textAnalysis } from "@repo/db/schema";

export type InsertTextAnalysis = typeof textAnalysis.$inferInsert;

export type DeleteTextAnalysis = Required<Pick<InsertTextAnalysis, "id" | "userId">>;

export type InsertJournalAnalysis = typeof journalAnalysis.$inferInsert;

export type JournalAnalysisPayload = Required<Pick<InsertJournalAnalysis, "journalId" | "emotion" | "keywords" | "summary"> & {
  text: string;
}>
