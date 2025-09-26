import { GoogleGenAI } from "@google/genai";
import { NewsletterReport, ScamInsight, Source } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// The responseSchema has been removed as it's incompatible with the googleSearch tool.
// The prompt is now structured to instruct the model to return JSON directly.

export const fetchNewsletterReport = async (): Promise<NewsletterReport> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Act as a cryptocurrency security analyst compiling a weekly intelligence newsletter. Use Google Search to find the 3-4 most significant and recent cryptocurrency scams.
      Your entire response MUST be a single, valid JSON object that can be parsed by a standard JSON parser. Do not include markdown fences (like \`\`\`json) or any other text outside of the JSON object.
      All property names (keys) in the JSON (like "title", "summary", "howToAvoid", and "threatLevel") MUST be enclosed in double quotes.
      The JSON object must have a single key "insights", which is an array of objects. Each object in the "insights" array must have the following properties:
      - "title": A catchy, descriptive headline for the scam.
      - "summary": A concise summary of how the scam works and who it targets.
      - "howToAvoid": Actionable, clear advice on how to avoid this specific scam.
      - "threatLevel": A string with one of the following values: "High", "Medium", or "Low".`,
      config: {
        tools: [{googleSearch: {}}],
        // responseMimeType and responseSchema are removed to fix the API error.
      },
    });

    const rawText = response.text.trim();
    // Find the start and end of the JSON object in the response text.
    const startIndex = rawText.indexOf('{');
    const endIndex = rawText.lastIndexOf('}');

    if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
      throw new Error("Could not find a valid JSON object in the AI response.");
    }

    const jsonText = rawText.substring(startIndex, endIndex + 1);

    const parsedJson = JSON.parse(jsonText);
    const insights: ScamInsight[] = parsedJson.insights || [];

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const sourceMap = new Map<string, Source>();
    groundingChunks.forEach((chunk: any) => {
      if (chunk.web && chunk.web.uri) {
        sourceMap.set(chunk.web.uri, {
          uri: chunk.web.uri,
          title: chunk.web.title || chunk.web.uri,
        });
      }
    });
    const sources = Array.from(sourceMap.values());
    
    return { insights, sources };
  } catch (error) {
    console.error("Error fetching or parsing from Gemini API:", error);
    // Try to get a more detailed error message from the original error object
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Original error message:", errorMessage);
    throw new Error("Failed to generate grounded newsletter report from AI.");
  }
};