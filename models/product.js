const mongoose = require('mongoose');

// Define the Product Schema
const productSchema = new mongoose.Schema({
  
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Assuming 'Category' is the collection name for categories
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }, 
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Create the Product Model
const Product = mongoose.model('Product', productSchema);
 module.exports = Product