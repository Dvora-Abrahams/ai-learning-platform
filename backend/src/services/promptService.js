import { Prompt } from "../models/Prompt.js";
import { Category } from "../models/Category.js";
import { SubCategory } from "../models/SubCategory.js";
import OpenAI from "openai";
import env from "../config/env.js";

// Initialize OpenAI client
let openai = null;
if (env.openaiApiKey && env.openaiApiKey.startsWith('sk-')) {
  try {
    openai = new OpenAI({ apiKey: env.openaiApiKey });
    console.log('SUCCESS: OpenAI client initialized with API key');
  } catch (e) {
    console.error('FAILED: OpenAI SDK initialization error:', e?.message || e);
    openai = null;
  }
} else {
  console.warn('WARNING: No valid OPENAI_API_KEY found - will use mock responses');
}

/**
 * Generate local educational response
 */
const generateLocalResponse = ({ userPrompt, categoryName, subCategoryName }) => {
  return `Educational Response: ${userPrompt}

Topic: ${categoryName} → ${subCategoryName}

Introduction:
This is an educational response about ${subCategoryName} in the field of ${categoryName}. Learning is a continuous process that helps us understand the world around us.

Key Points:
• Understanding ${subCategoryName} requires practice and patience
• Real-world applications make learning more meaningful
• Breaking complex topics into smaller parts helps comprehension
• Regular review strengthens knowledge retention

Practical Application:
Look for examples of ${subCategoryName} in your daily life. This helps connect theoretical knowledge with practical experience.

Next Steps:
1. Research more about this topic from reliable sources
2. Practice what you've learned through exercises
3. Discuss the topic with others to deepen understanding
4. Apply the knowledge in real situations when possible

Remember: Every expert was once a beginner. Keep learning and stay curious!`;
};

const aiGenerate = async ({ userPrompt, categoryName, subCategoryName }) => {
  console.log('aiGenerate called with:', { userPrompt, categoryName, subCategoryName });
  console.log('OpenAI client status:', openai ? 'Available' : 'Not available');
  
  // Always try OpenAI first if client exists
  if (openai) {
    try {
      console.log('Attempting OpenAI API call...');
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an educational AI assistant. Provide comprehensive, engaging lessons about ${subCategoryName} in ${categoryName}. Include practical examples and exercises. Answer in Hebrew if the question is in Hebrew.`
          },
          {
            role: "user",
            content: userPrompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      });
      
      console.log('SUCCESS: OpenAI response received');
      return completion.choices[0].message.content;
    } catch (error) {
      console.error('FAILED: OpenAI API error:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
      console.log('Falling back to mock response...');
    }
  } else {
    console.log('No OpenAI client available, using mock response');
  }
  
  // Fallback to mock response
  return generateLocalResponse({ userPrompt, categoryName, subCategoryName });
};

/**
 * Create a new prompt and generate AI response
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

  return newPrompt;
};

export const getUserPrompts = async (user_id, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  
  const prompts = await Prompt.find({ user_id })
    .populate('category_id', 'name')
    .populate('sub_category_id', 'name')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
    
  const total = await Prompt.countDocuments({ user_id });
  
  return {
    prompts,
    total,
    page,
    pages: Math.ceil(total / limit)
  };
};

export const getAllPrompts = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  
  const prompts = await Prompt.find()
    .populate('user_id', 'name phone')
    .populate('category_id', 'name')
    .populate('sub_category_id', 'name')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
    
  const total = await Prompt.countDocuments();
  
  return {
    prompts,
    total,
    page,
    pages: Math.ceil(total / limit)
  };
};

export const listUserPrompts = async (userId) => {
  return Prompt.find({ user_id: userId })
    .populate("category_id", "name")
    .populate("sub_category_id", "name")
    .sort({ createdAt: -1 });
};