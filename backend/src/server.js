import connectDB from "./config/db.js";
import  env from "./config/env.js";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

async function startServer() {
  try {
    await connectDB();
    console.log("✅ MongoDB connected successfully");

    const PORT = process.env.PORT || env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
}

startServer();
