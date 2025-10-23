import dotenv from "dotenv";
dotenv.config();

const env = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/ai-learning-platform",
  JWT_SECRET: process.env.JWT_SECRET || "dev-secret",
  NODE_ENV: process.env.NODE_ENV || "development",
};

export default env;
