import z from "zod";

export const createJournalSchema = z.object({
  ambience: z.string(),
  text:z.string()
})
