import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function generateAIPlan(task, deadline, description) {
  const prompt = `
You are DeadlineAI, an expert AI productivity coach.

Today's Date: ${new Date().toLocaleDateString()}

Task Name:
${task}

Deadline:
${deadline}

Task Description:
${description}

Create a practical productivity plan.

Return the answer in the following format only:

📌 Priority:
(High / Medium / Low)

⏳ Estimated Time:
(Number of hours)

📅 Today's Action Plan:
- Step 1
- Step 2
- Step 3

📅 Tomorrow's Action Plan:
- Step 1
- Step 2

💡 Productivity Tips:
- Tip 1
- Tip 2
- Tip 3

⚠️ Risks:
- Mention anything that could delay completion.

✅ Final Advice:
Give one short motivational sentence.

Keep the response under 250 words.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);

    return "❌ Unable to generate an AI plan. Please check your API key, internet connection, or Gemini configuration.";
  }
}