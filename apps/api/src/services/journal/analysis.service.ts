import {analyzeEmotion} from "@repo/llm/analyzeEmotion"
import { clearChatHistory, createTextHistory, getTextHistory } from "../../repositories/analyze/text.repo";
import { createJournalAnalysis, findAnalysisById } from "../../repositories/analyze/journal.repo";
import type {  JournalAnalysisPayload } from "@repo/types/journal";

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


export const getJournalEmotionSummery = async (text:string,journalId:string) => {

  const existing = await findAnalysisById(journalId);
  
  if (existing) {
    return existing;
  }
  
  const analysis = await analyzeEmotion(text);

  const payload: JournalAnalysisPayload = {
    ...analysis,
    text,
    journalId
  };


  const [result] = await createJournalAnalysis(payload);

  return result;

}
