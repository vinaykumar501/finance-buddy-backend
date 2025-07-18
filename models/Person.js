const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Serial Number
  name: String,
  phone: String,
  email: String,
  address: String
});

module.exports = mongoose.model('Person', personSchema);
