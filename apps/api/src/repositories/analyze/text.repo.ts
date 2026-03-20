import { db, textAnalysis } from "@repo/db";
import type { DeleteTextAnalysis, InsertTextAnalysis } from "@repo/types/journal";
import {and,eq} from "drizzle-orm"
export async function createTextHistory(data:InsertTextAnalysis) {
  return db.insert(textAnalysis).values(data).returning();
}

export async function getTextHistory(userId: string) {
  return db.query.textAnalysis.findMany({
    where:((textAnalysis,{eq})=>eq(textAnalysis.userId,userId))
  })
}

export async function deleteTextChat({id,userId}: DeleteTextAnalysis) {
  return db.delete(textAnalysis).where(and(
    eq(textAnalysis.id,id),
    eq(textAnalysis.userId,userId)
  )).returning()
}

export async function clearChatHistory(userId: string) {
  return db.delete(textAnalysis).where(
      eq(textAnalysis.userId,userId)
    ).returning()
}
