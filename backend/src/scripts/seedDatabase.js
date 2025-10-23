const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');

const seedData = async () => {
  try {
    await connectDB();

    console.log('🧹 Clearing existing data...');
    
    // Clear existing data
    await Category.deleteMany({});
    await SubCategory.deleteMany({});

    console.log('🌱 Seeding Categories...');
    
    // Seed Categories
    const categories = await Category.insertMany([
      { name: 'Science' },
      { name: 'Mathematics' },
      { name: 'Technology' },
      { name: 'History' },
      { name: 'Languages' }
    ]);

    console.log('✅ Categories seeded:', categories.length);

    console.log('🌱 Seeding SubCategories...');
    
    // Seed SubCategories
    const subCategories = [
      // Science
      { name: 'Space', category_id: categories[0]._id },
      { name: 'Biology', category_id: categories[0]._id },
      { name: 'Chemistry', category_id: categories[0]._id },
      { name: 'Physics', category_id: categories[0]._id },
      
      // Mathematics
      { name: 'Algebra', category_id: categories[1]._id },
      { name: 'Geometry', category_id: categories[1]._id },
      { name: 'Calculus', category_id: categories[1]._id },
      { name: 'Statistics', category_id: categories[1]._id },
      
      // Technology
      { name: 'Programming', category_id: categories[2]._id },
      { name: 'Web Development', category_id: categories[2]._id },
      { name: 'Artificial Intelligence', category_id: categories[2]._id },
      { name: 'Cybersecurity', category_id: categories[2]._id },
      
      // History
      { name: 'Ancient History', category_id: categories[3]._id },
      { name: 'Modern History', category_id: categories[3]._id },
      { name: 'World Wars', category_id: categories[3]._id },
      { name: 'Medieval History', category_id: categories[3]._id },
      
      // Languages
      { name: 'English', category_id: categories[4]._id },
      { name: 'Spanish', category_id: categories[4]._id },
      { name: 'French', category_id: categories[4]._id },
      { name: 'Hebrew', category_id: categories[4]._id }
    ];

    await SubCategory.insertMany(subCategories);

    console.log('✅ SubCategories seeded:', subCategories.length);
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\nSeeded data:');
    console.log('- Categories: 5');
    console.log('- SubCategories: 20');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedData();