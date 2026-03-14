import z from "zod";

export const textAnalyzeSchema = z.object({
  text:z.string()
})
