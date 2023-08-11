const mongoose = require('mongoose');

// Custom validator function for pincode
function validatePincode(value) {
  const pincodeRegex = /^\d{6}$/;
  return pincodeRegex.test(value);
}

// Define the Address Schema
const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming 'User' is the collection name for users
  city: { type: String, required: true },
  street: { type: String, required: true },
  village: { type: String },
  state: { type: String, required: true },
  pincode: {
    type: String,
    required: true,
    validate: {
      validator: validatePincode,
      message: 'Pincode must be a six-digit numeric value.',
    },
  },
  
  createdAt: { type: Date, default: Date.now },
});

// Create the Address Model
const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
