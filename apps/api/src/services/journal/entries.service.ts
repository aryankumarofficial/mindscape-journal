import type { InsertJournalEntry } from "@repo/types/journal";
import { createJournal, deleteJournalById, getUserJournals } from "../../repositories/journal.repo";

export const addJournal = (data: InsertJournalEntry) => createJournal(data);

export const getJournals = (userId: string) => getUserJournals(userId);

export const deleteJournal = (userId: string) => deleteJournalById(userId);
