const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required']
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category reference is required']
  },
  sub_category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory',
    required: [true, 'SubCategory reference is required']
  },
  prompt: {
    type: String,
    required: [true, 'Prompt text is required'],
    trim: true,
    minlength: [5, 'Prompt must be at least 5 characters']
  },
  response: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Prompt', promptSchema);
