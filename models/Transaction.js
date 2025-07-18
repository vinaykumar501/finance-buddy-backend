const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  personId: String, // serial number of the person
  amount: Number,
  type: String, // "give" or "receive"
  reason: String,
  date: String
});

module.exports = mongoose.model('Transaction', transactionSchema);
