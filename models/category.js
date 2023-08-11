const mongoose = require('mongoose');

// Define the Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active', required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create the Category Model and specify the collection name
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
