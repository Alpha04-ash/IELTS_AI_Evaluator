import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const gradingSchema = z.object({
  score: z.number().describe("The IELTS band score from 1.0 to 9.0"),
  feedback: z.string().describe("Detailed feedback based on IELTS criteria (markdown allowed)"),
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || ""
});

export async function gradeIELTSTask(type: "WRITING" | "SPEAKING", taskData: string, userInput: string) {
  const prompt = `
    You are an expert IELTS Examiner. 
    Task Type: ${type}
    Task Description: ${taskData}
    Student Submission: ${userInput}

    Please provide:
    1. A Band Score (1.0 to 9.0)
    2. Detailed feedback based on:
       - Task Response
       - Coherence and Cohesion
       - Lexical Resource
       - Grammatical Range and Accuracy
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: zodToJsonSchema(gradingSchema),
      },
    });

    const result = gradingSchema.parse(JSON.parse(response.text));
    return result;
  } catch (error) {
    console.error("AI Grading failed:", error);
    return {
      score: 0,
      feedback: "AI Grading is temporarily unavailable. Please try again later.",
    };
  }
}
