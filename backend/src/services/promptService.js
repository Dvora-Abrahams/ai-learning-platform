// src/services/promptService.js
import { Prompt } from "../models/Prompt.js";

// נאתחל לקוח OpenAI רק אם יש מפתח בסביבה
let openai = null;
if (process.env.OPENAI_API_KEY) {
  try {
    const { default: OpenAI } = await import("openai");
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  } catch (e) {
    console.error("OpenAI SDK init failed:", e?.message || e);
    openai = null;
  }
}

// מחולל תשובה מה-AI (או Mock אם אין מפתח)
const aiGenerate = async ({ userPrompt, categoryName, subCategoryName }) => {
  // אין מפתח — נחזיר תשובה מדומה אבל שימושית
  if (!openai) {
    return `Mock AI response:
- Category: ${categoryName || "N/A"}
- Sub-category: ${subCategoryName || "N/A"}
- Prompt: ${userPrompt}

(For real AI output, set OPENAI_API_KEY in .env)`;
  }

  const system = `You are an educational content generator.
Given a category and sub-category, create a concise, structured learning response.
Return sections: Intro (2-3 lines), 3-5 bullet points, and a short practical exercise.
Keep it clear and beginner-friendly.`;

  const user = `Category: ${categoryName || "Unknown"}
Sub-category: ${subCategoryName || "Unknown"}
Task: ${userPrompt}`;

  try {
    // SDK v4 – chat completions
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: 0.4,
      max_tokens: 600,
    });

    const text = completion.choices?.[0]?.message?.content?.trim();
    return text || "No AI response.";
  } catch (err) {
    // לא נכשלים – מחזירים הודעת Mock ידידותית להמשך פיתוח
    console.error("OpenAI error:", err?.message || err);
    return `AI error occurred; returning fallback content.
Prompt: ${userPrompt}
(Details hidden in server logs)`;
  }
};

// יצירה ושמירה של Prompt במסד
export const createPrompt = async ({
  user_id,
  category_id,
  sub_category_id,
  prompt,
  categoryName,      // אופציונלי: אם יש לך את השמות
  subCategoryName,   // אופציונלי
}) => {
  const response = await aiGenerate({ userPrompt: prompt, categoryName, subCategoryName });
  return Prompt.create({ user_id, category_id, sub_category_id, prompt, response });
};

// היסטוריית פרומפטים של משתמש
export const listUserPrompts = (userId) =>
  Prompt.find({ user_id: userId })
    .populate("category_id", "name")
    .populate("sub_category_id", "name")
    .sort({ createdAt: -1 });
