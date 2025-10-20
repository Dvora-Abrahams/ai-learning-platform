const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    unique: true,
    trim: true,
    match: [/^[0-9]{10,15}$/, 'Please provide a valid phone number']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);