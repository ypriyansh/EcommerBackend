const mongoose = require('mongoose');

// Define the Order Schema
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming 'User' is the collection name for users
  cartID: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true }, // Assuming 'Cart' is the collection name for cart items
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered'], default: 'pending' },
});

// Create the Order Model
const Order = mongoose.model('Order', orderSchema);
