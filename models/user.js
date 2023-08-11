const mongoose = require('mongoose');

// Custom validator function for phone number
function validatePhoneNumber(value) {
  const phoneNumberRegex = /^\d{10}$/;
  return phoneNumberRegex.test(value);
}

// Define the User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: {
    type: Number,
    required: true,
    validate: {
      validator: validatePhoneNumber,
      message: 'Phone number must be a 10-digit numeric value.',
    },
  },
  defaultAddressId: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' }, // Assuming 'Address' is the collection name for addresses
  createdAt: { type: Date, default: Date.now },
});

// Create the User Model
const User = mongoose.model('User', userSchema);

module.exports = User;
