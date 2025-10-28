import { Prompt } from "../models/Prompt.js";
import { Category } from "../models/Category.js";
import { SubCategory } from "../models/SubCategory.js";
import OpenAI from "openai";
import env from "../config/env.js";

// Initialize OpenAI client
let openai = null;
if (env.openaiApiKey) {
  try {
    openai = new OpenAI({ apiKey: env.openaiApiKey });
    console.log("✅ OpenAI client initialized");
  } catch (e) {
    console.error("❌ OpenAI SDK init failed:", e?.message || e);
    openai = null;
  }
} else {
  console.warn("⚠️  No OPENAI_API_KEY found - using fallback responses");
}

/**
 * Generate local educational response
 */
const generateLocalResponse = ({ userPrompt, categoryName, subCategoryName }) => {
  const responses = {
    "Science": {
      "Physics": `🔬 Physics Lesson: ${userPrompt}

Introduction:
Physics is the fundamental science that seeks to understand how the universe works. It studies matter, energy, and their interactions.

Key Concepts:
• Matter and Energy: Everything in the universe is made of matter and energy
• Forces: Push or pull that can change an object's motion
• Motion: Change in position over time
• Conservation Laws: Energy and momentum are conserved in isolated systems

Practical Example:
When you throw a ball, gravity pulls it down while air resistance slows it. The ball's energy transforms from kinetic (motion) to potential (height) and back.

Practice Exercise:
Drop two objects of different weights from the same height. Notice they fall at the same rate (ignoring air resistance)!`,
      
      "Chemistry": `⚗️ Chemistry Lesson: ${userPrompt}

Introduction:
Chemistry is the science of matter and the changes it undergoes. It explains how atoms combine to form molecules and compounds.

Key Concepts:
• Atoms: Basic building blocks of all matter
• Elements: Pure substances made of one type of atom
• Compounds: Substances made of two or more different atoms
• Chemical Reactions: Processes where substances change into new substances

Practical Example:
When you bake a cake, chemical reactions occur. Heat causes proteins to coagulate and starches to gelatinize, creating the cake's structure.

Practice Exercise:
Mix baking soda and vinegar to see a chemical reaction that produces carbon dioxide gas!`
    },
    
    "Technology": {
      "Programming": `💻 Programming Lesson: ${userPrompt}

Introduction:
Programming is the process of creating instructions for computers to follow. It's like writing a recipe that a computer can understand and execute.

Key Concepts:
• Variables: Containers that store data values
• Functions: Reusable blocks of code that perform specific tasks
• Loops: Structures that repeat code multiple times
• Conditionals: Code that makes decisions based on different conditions

Practical Example:
A simple program might ask for your name, store it in a variable, then display "Hello, [your name]!" on the screen.

Practice Exercise:
Try writing pseudocode (plain English instructions) for making a sandwich. This helps you think like a programmer!`,
      
      "Web Development": `🌐 Web Development Lesson: ${userPrompt}

Introduction:
Web development involves creating websites and web applications. It combines design, programming, and user experience to build interactive online experiences.

Key Concepts:
• HTML: Structure and content of web pages
• CSS: Styling and layout of web pages
• JavaScript: Interactive behavior and functionality
• Responsive Design: Making websites work on all device sizes

Practical Example:
A simple website has HTML for content (headings, paragraphs), CSS for colors and layout, and JavaScript for interactive buttons.

Practice Exercise:
Create a basic HTML page with a heading, paragraph, and button. Open it in your browser to see your first webpage!`
    },
    
    "History": {
      "Ancient History": `🏛️ Ancient History Lesson: ${userPrompt}

Introduction:
Ancient history covers the earliest recorded human civilizations, from the development of writing systems to the fall of classical empires.

Key Concepts:
• Civilization: Complex societies with cities, government, and culture
• Writing Systems: Methods of recording information and ideas
• Trade Routes: Networks that connected distant civilizations
• Cultural Exchange: Sharing of ideas, technologies, and beliefs

Practical Example:
The Silk Road connected China to Europe, allowing the exchange of goods, ideas, and technologies across vast distances.

Practice Exercise:
Research one ancient civilization and identify three innovations they contributed to human development.`,
      
      "World Wars": `⚔️ World Wars Lesson: ${userPrompt}

Introduction:
The World Wars were global conflicts that shaped the 20th century. Understanding this period helps us learn from history and work toward peace.

Key Historical Context:
• World War I (1914-1918): The "Great War" that changed European borders
• Interwar Period (1918-1939): Economic instability and rise of totalitarian regimes
• World War II (1939-1945): Global conflict involving most nations
• Holocaust: Systematic persecution and murder of 6 million Jews and millions of others

Important Lessons:
• The dangers of unchecked authoritarianism and propaganda
• How economic hardship can lead to political extremism
• The importance of international cooperation and human rights
• The resilience of democratic institutions and values

Historical Significance:
Studying figures like Hitler helps us understand how dictatorships emerge and the importance of protecting democratic institutions and human rights.

Reflection Exercise:
Research how democratic societies today work to prevent the rise of authoritarianism and protect minority rights.`
    }
  };
  
  // Get specific response or default
  const categoryResponses = responses[categoryName];
  if (categoryResponses && categoryResponses[subCategoryName]) {
    return categoryResponses[subCategoryName];
  }
  
  // Default response for any topic
  return `📚 Educational Response: ${userPrompt}

📖 Topic: ${categoryName} → ${subCategoryName}

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
  console.log('🔍 aiGenerate called with:', { userPrompt, categoryName, subCategoryName });
  console.log('🔍 OpenAI client status:', openai ? 'Available' : 'Not available');
  
  // Try OpenAI first if available
  if (openai) {
    try {
      console.log('🚀 Calling OpenAI API...');
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
      
      console.log('✅ OpenAI response received');
      return completion.choices[0].message.content;
    } catch (error) {
      console.error('❌ OpenAI API failed:', error.message);
      console.error('❌ Full error:', error);
      // Fall back to local response on any OpenAI error
    }
  }
  
  // Fallback to local response
  console.log('📚 Using local fallback response');
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