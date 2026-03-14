import { client } from "./config";
import type {EmotionAnalysis} from "@repo/types/llm"

export async function analyzeEmotion(text: string): Promise<EmotionAnalysis>{
  const prompt = `
    Analyze the following journal entry and return ONLY valid JSON.

    Format:
    {
      "emotion": "primary emotion",
      "keywords": ["keyword1","keyword2"],
      "summary": "short explanation of the emotional state"
    }

    Journal entry:
    ${text}
    `

  const response = await client.chat.completions.create({
    model: "openai/gpt-oss-120b",
    temperature: 0.2,
        messages: [
          {
            role: "system",
            content:
              "You are an emotional analysis assistant that returns structured JSON only.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
  })

  const content = response.choices[0]?.message.content || `{}`;
  try {
    return JSON.parse(content);
  } catch {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid LLM JSON response");
    return JSON.parse(jsonMatch[0]);

  }

}
