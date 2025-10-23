import mongoose from "mongoose";
import env from "./env.js";

const connectDB = async () => {
  try {
    const uri = env.MONGODB_URI;
    if (!uri) throw new Error("❌ Missing MONGODB_URI in .env");

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
