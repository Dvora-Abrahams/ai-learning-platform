import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import app from "./app.js";

async function startServer() {
  try {
    // חיבור למסד הנתונים
    await connectDB();
    console.log("✅ MongoDB connected successfully");

    // הפעלת השרת
    app.listen(env.PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${env.PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
}

startServer();
