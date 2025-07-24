const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  personId: String, 
  amount: Number,
  type: String, 
  reason: String,
  date: String
});

module.exports = mongoose.model('Transaction', transactionSchema);
