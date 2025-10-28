
import { Prompt } from "../models/Prompt.js";
import { Category } from "../models/Category.js";
import { SubCategory } from "../models/SubCategory.js";
import OpenAI from "openai";
import env from "../config/env.js";

// Initialize OpenAI client
let openai = null;
console.log('🔍 Checking OpenAI API key:', !!env.openaiApiKey);
if (env.openaiApiKey) {
  try {
    openai = new OpenAI({ apiKey: env.openaiApiKey });
    console.log("✅ OpenAI client initialized successfully");
    console.log('🔍 OpenAI client exists:', !!openai);
  } catch (e) {
    console.error("❌ OpenAI SDK init failed:", e?.message || e);
    openai = null;
  }
} else {
  console.warn("⚠️  No OPENAI_API_KEY found - using mock responses");
}

/**
 * Generate AI response (or mock if no API key)
 */
const aiGenerate = async ({ userPrompt, categoryName, subCategoryName }) => {
  console.log('🤖 aiGenerate called, openai exists:', !!openai);
  // No API key - return mock response
  if (!openai) {
    console.log('📝 Returning mock response - no OpenAI client');
    return `Mock AI Response:

📚 Category: ${categoryName || "N/A"}
📖 Sub-category: ${subCategoryName || "N/A"}
❓ Your Question: ${userPrompt}

Introduction:
This is a mock response. To get real AI-generated lessons, please set your OPENAI_API_KEY in the .env file.

Key Points:
• Point 1: This is a placeholder response
• Point 2: Real AI will provide detailed, educational content
• Point 3: The system is working correctly, just needs an API key

Practice Exercise:
Try setting up your OpenAI API key to unlock full functionality!

(For real AI output, set OPENAI_API_KEY in .env)`;
  }

  const systemMessage = `You are an expert educator specializing in ${categoryName}.
Create a clear, engaging, and structured lesson about ${subCategoryName}.

Format your response as follows:
1. Introduction (2-3 sentences explaining the concept)
2. Key Concepts (3-5 bullet points with clear explanations)
3. Practical Example (real-world application)
4. Practice Exercise (something the learner can try)

Keep the language simple and beginner-friendly.`;

  const userMessage = `Topic: ${categoryName} → ${subCategoryName}
Question/Task: ${userPrompt}

Please provide a comprehensive educational response following the structure above.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const text = completion.choices?.[0]?.message?.content?.trim();
    return text || "No AI response generated.";
  } catch (err) {
    console.error("❌ OpenAI API error:", err?.message || err);

    // Return friendly fallback
    return `⚠️ AI Error Occurred

We encountered an issue generating the AI response. Here's what you asked about:

Topic: ${categoryName} → ${subCategoryName}
Your Question: ${userPrompt}

Error Details (for debugging):
${err?.message || "Unknown error"}

Please check:
1. Your OpenAI API key is valid
2. You have sufficient API credits
3. The OpenAI service is accessible

You can try again or contact support if the issue persists.`;
  }
};

/**
 * Create a new prompt and generate AI response
 * FIXED: Now fetches category and subcategory names
 */
export const createPrompt = async ({
  user_id,
  category_id,
  sub_category_id,
  prompt,
}) => {
  // Fetch category and subcategory names
  const category = await Category.findById(category_id);
  const subCategory = await SubCategory.findById(sub_category_id);

  const categoryName = category?.name || "Unknown Category";
  const subCategoryName = subCategory?.name || "Unknown SubCategory";

  // Generate AI response
  const response = await aiGenerate({
    userPrompt: prompt,
    categoryName,
    subCategoryName,
  });

  // Save to database
  const newPrompt = await Prompt.create({
    user_id,
    category_id,
    sub_category_id,
    prompt,
    response,
  });

  // Populate references before returning
  await newPrompt.populate([
    { path: "user_id", select: "name phone role" },
    { path: "category_id", select: "name" },
    { path: "sub_category_id", select: "name" },
  ]);

  return newPrompt;
};

/**
 * Get user's learning history
 */
export const listUserPrompts = async (userId) => {
  return Prompt.find({ user_id: userId })
    .populate("category_id", "name")
    .populate("sub_category_id", "name")
    .sort({ createdAt: -1 });
};