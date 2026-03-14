import type { InsertJournalEntry } from "@repo/types/journal";
import { createJournal } from "../../repositories/journal.repo";

export const addJournal = (data: InsertJournalEntry) => createJournal(data);
