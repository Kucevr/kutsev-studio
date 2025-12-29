
import { GoogleGenAI, Type } from "@google/genai";
import { AIResponse } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProjectStructure = async (userIdea: string): Promise<AIResponse> => {
  const model = "gemini-2.5-flash";
  
  const systemInstruction = `
    Ты - креативный директор и технический архитектор веб-студии высокого уровня (похожей на Wix Studio, awwwards).
    Твоя задача - принять сырую идею клиента и превратить её в структурированный концепт проекта.
    
    1. Проанализируй идею.
    2. Предложи краткий бриф (brief) - суть проекта, целевая аудитория, ключевая цель.
    3. Предложи стек технологий (technologies) - например, React, WebGL, 3D, Minimalist Design.
    4. Опиши "вайб" (vibe) - настроение, цветовая гамма, стиль (например: "Строгий корпоративный", "Неоновый киберпанк", "Чистый минимализм").
    
    Отвечай на русском языке.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: userIdea,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            brief: { type: Type.STRING, description: "Краткое описание сути проекта и целей." },
            technologies: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Список рекомендованных технологий или дизайн-решений."
            },
            vibe: { type: Type.STRING, description: "Описание визуального стиля и настроения." }
          },
          required: ["brief", "technologies", "vibe"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AIResponse;
    }
    
    throw new Error("No response text");

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      brief: "Мы готовы обсудить ваш проект лично. Свяжитесь с нами для детальной проработки.",
      technologies: ["React", "Tailwind", "Next.js"],
      vibe: "Профессиональный и чистый стиль"
    };
  }
};
