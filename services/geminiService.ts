// import { GoogleGenerativeAI } from "@google/generative-ai"; // Not used, using fetch directly
import { FLORAL_ARCHITECT_PROMPT } from './prompts';

// Initialize the API
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// We'll use the 'gemini-1.5-flash' model for speed and multimodal capabilities
const getModel = () => {
  if (!apiKey) {
    console.error("API Key not found in VITE_GEMINI_API_KEY");
    return null;
  }
  // Try using the standard SDK class. If @google/genai is installed, it might be different,
  // but usually @google/generative-ai is the one for web.
  // If the user has @google/genai, it might be the server side lib?
  // Let's try to be safe. If the previous file imported GoogleGenAI from @google/genai,
  // and the package.json has @google/genai, we should use that.
  // HOWEVER, the standard web SDK is @google/generative-ai.
  // Having @google/genai in dependencies for a vite app is suspicious if it's the node lib.
  // But let's assume the user wants to use whatever is installed.
  // The safest bet for a "fix" without reinstalling packages is to try to use what's there
  // OR standard fetch calls if the library is incompatible.

  // Given the ambiguity, I will implement using fetch calls to the REST API directly
  // to avoid issues with the library exports if they are node-only.
  // This is often more robust for simple usage.
  return null;
};

// Helper to direct call API if SDK is failing or weird
const runGemini = async (prompt: string, imageBase64?: string) => {
  if (!apiKey) throw new Error("API Key Missing");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const contents: any[] = [{
    role: "user",
    parts: [{ text: prompt }]
  }];

  if (imageBase64) {
    // Extract base64 part if it has prefix
    const base64Data = imageBase64.split(',')[1] || imageBase64;
    const mimeType = imageBase64.split(';')[0].split(':')[1] || 'image/jpeg';

    contents[0].parts.push({
      inline_data: {
        mime_type: mimeType,
        data: base64Data
      }
    });
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents })
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || "Gemini API Error");
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
};

export const analyzeFloralImage = async (base64Image: string): Promise<string> => {
  try {
    const prompt = FLORAL_ARCHITECT_PROMPT;
    const result = await runGemini(prompt, base64Image);
    return result;
  } catch (error) {
    console.error("Error analyzing image:", error);
    return "Error al conectar con el Arquitecto Floral.";
  }
};

export const refineFloralPrompt = async (image: string, previousAnalysis: string | null, refinement: string): Promise<string> => {
  try {
    const prompt = `
      Previous Analysis: ${previousAnalysis || "None"}
      
      User Refinement Request: ${refinement}
      
      Please update the analysis and generated prompts based on the user's refinement.
      Keep the same output format with Analysis, Option 1, Option 2, Option 3.
    `;
    const result = await runGemini(prompt, image);
    return result;
  } catch (error) {
    console.error("Error refining prompt:", error);
    return "Error al refinar.";
  }
};

export const generateFloralInspiration = async (prompt: string): Promise<string | null> => {
  // NOTE: gemini-1.5-flash does not generate images natively in this API endpoint usually.
  // If the user expects an image, we can't easily give one without Imagen key/endpoint.
  // We will return null or a placeholder for now to prevent crash.
  console.warn("Image generation not supported directly via Gemini Text API.");
  return null;
};

export const generateSentimentMessage = async (recipient: string, occasion: string, tone: string): Promise<string> => {
  try {
    const prompt = `
      Write a short, heart-warming card message for a flower delivery.
      
      Recipient: ${recipient}
      Occasion: ${occasion}
      Tone: ${tone}
      
      Language: Spanish.
      Max length: 50 words.
      Make it poetic and sincere.
    `;
    const result = await runGemini(prompt);
    return result;
  } catch (error) {
    console.error("Error generating sentiment message:", error);
    return `Para ${recipient}, con mucho cariño en tu ${occasion}.`; // Fallback
  }
};
