import { db, journalEntries } from "@repo/db";
import type { InsertJournalEntry, UpdateJournalEntry } from "@repo/types/journal";
import {and, count, desc, eq} from "drizzle-orm"

export async function getJournalById(journalId: string) {
  return db.query.journalEntries.findFirst({
    where:((journal,{eq})=>eq(journal.id,journalId))
  })
}

export async function createJournal(data: InsertJournalEntry) {
  return db.insert(journalEntries).values(data).returning();
}


export async function getUserJournals(userId: string) {
  return db.query.journalEntries.findMany({
    where:((journal,{eq})=>eq(journal.userId,userId))
  })
}

export async function deleteJournal(journalId: string) {
  return db.delete(journalEntries).where(eq(journalEntries.id, journalId)).returning();
}

export async function clearUserJournals(userId: string) {
  return db.delete(journalEntries).where(eq(journalEntries.userId, userId)).returning();
}

export async function updateJournal(data: UpdateJournalEntry) {
  const updateData: Partial<InsertJournalEntry> = {}

  if (data.text !== undefined) updateData.text = data.text;
  if (data.ambience !== undefined) updateData.ambience = data.ambience;

  return db.update(journalEntries).set(updateData).where(and(
    eq(journalEntries.id, data.id),
    eq(journalEntries.userId,data.userId),
  )).returning()
}


export async function getTotalEntries(userId: string) {
  const result = await db
    .select({ count: count() })
    .from(journalEntries)
    .where(eq(journalEntries.userId, userId));
  
  return result[0]?.count ?? 0;
}

export async function getMostUsedAmbience(userId: string) {
  const result = await db
    .select({
      ambience: journalEntries.ambience,
      count:count()
    })
    .from(journalEntries)
    .where(eq(journalEntries.userId, userId))
    .groupBy(journalEntries.ambience)
    .orderBy(desc(count()))
    .limit(1)
  
  return result[0]?.ambience ?? count;
}