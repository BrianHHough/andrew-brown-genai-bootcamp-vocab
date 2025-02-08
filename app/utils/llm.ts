import { generateText } from "ai"
import { createOpenAI as createGroq } from "@ai-sdk/openai"

const groq = createGroq({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
})

export async function generateVocabularyFromLLM(category: string) {
  const prompt = `Generate a structured JSON output for Japanese vocabulary related to the theme "${category}". The output should be an array of objects, where each object represents a vocabulary item with the following structure:
  {
    "kanji": "Japanese word in kanji or kana",
    "romaji": "Romanized version of the word",
    "english": "English translation",
    "parts": [
      {
        "kanji": "Individual kanji or kana character",
        "romaji": ["Possible readings of the character"]
      },
      ...
    ]
  }
  Generate at least 5 vocabulary items.`

  try {
    const { text } = await generateText({
      model: groq("llama-3.1-70b-reasoning"),
      prompt: prompt,
    })

    // Parse the generated text as JSON
    const vocabularyData = JSON.parse(text)
    return vocabularyData
  } catch (error) {
    console.error("Error generating vocabulary from LLM:", error)
    throw error
  }
}

