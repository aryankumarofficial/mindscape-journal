import z from "zod";

export const journalSchema = z.object({
  ambience: z.string().min(1, { error: `Ambience is required` }),
  text: z.string().min(1, { error: `provide content for your journal` }),
});

export type Journal = z.infer<typeof journalSchema>;
