import {analyzeEmotion} from "@repo/llm/analyzeEmotion"
import { createTextHistory } from "../../repositories/analyze/text.repo";

export const getEmotionSummery = async ({ text,userId }: { text: string,userId:string }) => {
  const result = await analyzeEmotion(text);
  return await createTextHistory({
    ...result,
    input: text,
    userId
  });
};
