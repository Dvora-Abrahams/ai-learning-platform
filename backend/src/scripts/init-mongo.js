// MongoDB initialization script for Docker
db = db.getSiblingDB('ai-learning-platform');

// Create collections
db.createCollection('users');
db.createCollection('categories');
db.createCollection('subcategories');
db.createCollection('prompts');

// Create indexes for better performance
db.users.createIndex({ "phone": 1 }, { unique: true });
db.users.createIndex({ "role": 1 });
db.categories.createIndex({ "name": 1 }, { unique: true });
db.subcategories.createIndex({ "category_id": 1 });
db.prompts.createIndex({ "user_id": 1 });
db.prompts.createIndex({ "createdAt": -1 });

print('Database initialized successfully!');