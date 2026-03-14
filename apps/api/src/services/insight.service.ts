import { getRecentKeywords, getTopEmotion } from "../repositories/analyze/journal.repo";
import {getMostUsedAmbience, getTotalEntries} from "../repositories/journal.repo"

export async function getUserInsights(userId: string) {
  const totalEntries = await getTotalEntries(userId);
  const topEmotion = await getTopEmotion(userId);
  const mostUsedAmbience = await getMostUsedAmbience(userId);
  const recentKeywords = await getRecentKeywords(userId);
  
  return {
    totalEntries,
    topEmotion,
    mostUsedAmbience,
    recentKeywords
  }
  
}