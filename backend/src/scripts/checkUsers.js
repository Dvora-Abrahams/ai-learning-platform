import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/User.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ai-learning-platform";

const checkUsers = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const users = await User.find({});
    console.log("\n📋 All users in database:");
    console.log("=".repeat(50));
    
    if (users.length === 0) {
      console.log("❌ No users found in database!");
      console.log("Run: npm run seed");
    } else {
      users.forEach((user, index) => {
        console.log(`${index + 1}. Name: ${user.name}`);
        console.log(`   Phone: ${user.phone}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Created: ${user.createdAt}`);
        console.log("");
      });
    }

    console.log("=".repeat(50));
    console.log(`Total users: ${users.length}`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

checkUsers();