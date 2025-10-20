const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'SubCategory name is required'],
    trim: true
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category reference is required']
  }
}, {
  timestamps: true
});
subCategorySchema.index({ name: 1, category_id: 1 }, { unique: true });

module.exports = mongoose.model('SubCategory', subCategorySchema);
