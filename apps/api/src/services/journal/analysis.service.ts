import {analyzeEmotion} from "@repo/llm/analyzeEmotion"
import { clearChatHistory, createTextHistory, getTextHistory } from "../../repositories/analyze/text.repo";

export const getEmotionSummery = async ({ text,userId }: { text: string,userId:string }) => {
  const result = await analyzeEmotion(text);
  return await createTextHistory({
    ...result,
    input: text,
    userId
  });
};

export const getTextAnalysisHistory = (userId:string) => getTextHistory(userId);


export const clearTextAnalysisHistory = (userId:string)=> clearChatHistory(userId)
