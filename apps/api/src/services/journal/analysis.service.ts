import {analyzeEmotion} from "@repo/llm/analyzeEmotion"

export const getEmotionSummery = async ({text}:{text:string}) => await analyzeEmotion(text);
