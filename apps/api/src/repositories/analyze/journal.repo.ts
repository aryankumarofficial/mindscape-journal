import { db } from "@repo/db/index";
import { journalAnalysis, journalEntries } from "@repo/db/schema";
import type { InsertJournalAnalysis } from "@repo/types/journal";
import {count, desc, eq} from "drizzle-orm"
export async function getTopEmotion(userId: string) {
  const result = await db
    .select({
      emotion: journalAnalysis.emotion,
      count: count(),
    })
    .from(journalAnalysis)
    .innerJoin(
      journalEntries,
      eq(journalEntries.id, journalAnalysis.journalId)
    )
    .where(eq(journalEntries.userId, userId))
    .groupBy(journalAnalysis.emotion)
    .orderBy(desc(count()))
    .limit(1);

  return result[0]?.emotion ?? null;
}

export async function getRecentKeywords(userId: string) {
  const result = await db.execute(`
    SELECT jsonb_array_elements_text(keywords) as keyword
    FROM journal_analysis ja
    JOIN journal_entries je
    ON ja.journal_id = je.id
    WHERE je.user_id = ${userId}
    ORDER BY ja.created_at DESC
    LIMIT 10
    `);

  return [...new Set(result.rows.map((r)=>r.keyword))].slice(0,3)
}

export async function createJournalAnalysis(data:InsertJournalAnalysis) {
  return db.insert(journalAnalysis).values(data).returning();
}

export async function findAnalysisById(journalId: string) {
  return db.query.journalAnalysis.findFirst({
    where:((ja,{eq})=>eq(ja.journalId,journalId))
  })
}
