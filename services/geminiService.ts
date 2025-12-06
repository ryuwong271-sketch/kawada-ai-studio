import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to convert base64 to blob/file if needed, but Gemini takes base64 direct in some cases
// We will assume input is base64 string (without data:image/png;base64, prefix for the API usually, but the SDK handles inlineData)

export const editImageWithGemini = async (
  base64Image: string,
  prompt: string,
  mimeType: string = 'image/png'
): Promise<string> => {
  if (!apiKey) throw new Error("API Key is missing");

  // Remove header if present for processing
  const base64Data = base64Image.split(',')[1] || base64Image;

  try {
    const model = 'gemini-2.5-flash-image';
    
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          {
            text: prompt
          },
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType
            }
          }
        ]
      }
    });

    // Check for image in response
    // The response might contain text (if it failed to generate image or just chatted) 
    // or inlineData (if it generated an image)
    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      const parts = candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image generated. The model might have returned text instead: " + response.text);
  } catch (error) {
    console.error("Gemini Edit Error:", error);
    throw error;
  }
};

export const analyzeImageWithGemini = async (
  base64Image: string,
  prompt: string = "Describe this image in detail.",
  mimeType: string = 'image/png',
  language: 'en' | 'zh' | 'ms' | 'hi' = 'en'
): Promise<string> => {
  if (!apiKey) throw new Error("API Key is missing");

  const base64Data = base64Image.split(',')[1] || base64Image;
  
  // Adjust prompt for language
  let finalPrompt = prompt;
  if (language === 'zh') {
    finalPrompt += " 请用中文回答。";
  } else if (language === 'ms') {
    finalPrompt += " Sila jawab dalam Bahasa Melayu.";
  } else if (language === 'hi') {
    finalPrompt += " कृपया हिंदी में उत्तर दें।";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Good for multimodal analysis
      contents: {
        parts: [
          { text: finalPrompt },
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType
            }
          }
        ]
      }
    });

    return response.text || "No analysis available.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};