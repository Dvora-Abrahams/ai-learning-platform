import dotenv from "dotenv";
// dotenv.config();
dotenv.config({ path: './.env' });
console.log('🔍 Environment variables:');
console.log('OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY);
console.log('OPENAI_API_KEY length:', process.env.OPENAI_API_KEY?.length || 0);

const env = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/ai-learning-platform",
  JWT_SECRET: process.env.JWT_SECRET || "dev-secret",
  NODE_ENV: process.env.NODE_ENV || "development",
  openaiApiKey: process.env.OPENAI_API_KEY 
};

export default env;
