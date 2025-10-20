const mongoose = require('mongoose');
const config = require('./env');

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log(' MongoDB Connected Successfully');
  } catch (error) {
    console.error(' MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;