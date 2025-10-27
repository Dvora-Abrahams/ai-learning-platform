import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/User.js";
import { Category } from "../models/Category.js";
import { SubCategory } from "../models/SubCategory.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ai-learning-platform";

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    console.log("🧹 Clearing existing data...");

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await SubCategory.deleteMany({});

    console.log("👤 Creating Admin User...");

    // Create Admin User
    const adminUser = await User.create({
      name: "Admin",
      phone: "0500000000",
      password: "admin123",
      role: "admin",
    });

    console.log(" Admin user created:");
    console.log("   Phone: 0500000000");
    console.log("   Password: admin123");

    console.log("\n👤 Creating Test User...");

    // Create Test User
    const testUser = await User.create({
      name: "Test User",
      phone: "0501234567",
      password: "test123",
      role: "user",
    });

    console.log(" Test user created:");
    console.log("   Phone: 0501234567");
    console.log("   Password: test123");

    console.log("\n🌱 Seeding Categories...");

    // Seed Categories
    const categories = await Category.insertMany([
      { name: "Science" },
      { name: "Mathematics" },
      { name: "Technology" },
      { name: "History" },
      { name: "Languages" },
    ]);

    console.log(" Categories seeded:", categories.length);

    console.log(" Seeding SubCategories...");

    // Seed SubCategories
    const subCategories = [
      // Science
      { name: "Space", category_id: categories[0]._id },
      { name: "Biology", category_id: categories[0]._id },
      { name: "Chemistry", category_id: categories[0]._id },
      { name: "Physics", category_id: categories[0]._id },

      // Mathematics
      { name: "Algebra", category_id: categories[1]._id },
      { name: "Geometry", category_id: categories[1]._id },
      { name: "Calculus", category_id: categories[1]._id },
      { name: "Statistics", category_id: categories[1]._id },

      // Technology
      { name: "Programming", category_id: categories[2]._id },
      { name: "Web Development", category_id: categories[2]._id },
      { name: "Artificial Intelligence", category_id: categories[2]._id },
      { name: "Cybersecurity", category_id: categories[2]._id },

      // History
      { name: "Ancient History", category_id: categories[3]._id },
      { name: "Modern History", category_id: categories[3]._id },
      { name: "World Wars", category_id: categories[3]._id },
      { name: "Medieval History", category_id: categories[3]._id },

      // Languages
      { name: "English", category_id: categories[4]._id },
      { name: "Spanish", category_id: categories[4]._id },
      { name: "French", category_id: categories[4]._id },
      { name: "Hebrew", category_id: categories[4]._id },
    ];

    await SubCategory.insertMany(subCategories);

    console.log(" SubCategories seeded:", subCategories.length);
    console.log("\n Database seeding completed successfully!");
    console.log("\n" + "=".repeat(50));
    console.log(" SEEDED DATA SUMMARY:");
    console.log("=".repeat(50));
    console.log("\n Users:");
    console.log("   • Admin - Phone: 0500000000, Password: admin123");
    console.log("   • Test User - Phone: 0501234567, Password: test123");
    console.log("\n Categories: 5");
    console.log("   • Science");
    console.log("   • Mathematics");
    console.log("   • Technology");
    console.log("   • History");
    console.log("   • Languages");
    console.log("\n SubCategories: 20 (4 per category)");
    console.log("\n" + "=".repeat(50));
    console.log("\n TEST LOGIN CREDENTIALS:");
    console.log("=".repeat(50));
    console.log("\nAdmin:");
    console.log("  POST /api/auth/login");
    console.log('  { "phone": "0500000000", "password": "admin123" }');
    console.log("\nRegular User:");
    console.log("  POST /api/auth/login");
    console.log('  { "phone": "0501234567", "password": "test123" }');
    console.log("\n" + "=".repeat(50));

    await mongoose.connection.close();
    console.log("\n Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error(" Seeding error:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedData();