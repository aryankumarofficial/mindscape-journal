import type { textAnalysis } from "@repo/db/schema";

export type InsertTextAnalysis = typeof textAnalysis.$inferInsert;

export type DeleteTextAnalysis  = Required<Pick<InsertTextAnalysis,"id"|"userId">>;
