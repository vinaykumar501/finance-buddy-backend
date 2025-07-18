const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();
const PORT = 5000; // You can change the port if needed

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (local)
mongoose.connect('mongodb://localhost:27017/financeBuddy')
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Mongoose Models
const Person = require('./models/Person');
const Transaction = require('./models/Transaction');

// Sample root route
app.get('/', (req, res) => {
  res.send('Hello from Finance Buddy backend!');
});


// ==================== PERSON ROUTES ====================

// ➕ Create a new person
app.post('/api/person', async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    await newPerson.save();
    res.status(201).json(newPerson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📄 Get all persons
app.get('/api/person', async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Update person by ID (serial)
app.put('/api/person/:id', async (req, res) => {
  try {
    const updated = await Person.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Person not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🗑️ Delete person by ID (serial)
app.delete('/api/person/:id', async (req, res) => {
  try {
    const deleted = await Person.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ error: "Person not found" });
    res.json({ message: "Person deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ==================== TRANSACTION ROUTES ====================

// ➕ Create a new transaction
app.post('/api/transaction', async (req, res) => {
  try {
    const newTxn = new Transaction(req.body);
    await newTxn.save();
    res.status(201).json(newTxn);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📄 Get all transactions
app.get('/api/transaction', async (req, res) => {
  try {
    const txns = await Transaction.find();
    res.json(txns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🗑️ Delete one transaction by _id
app.delete('/api/transaction/:id', async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Transaction not found" });
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🗑️ Delete all transactions for a person
app.delete('/api/transaction/person/:personId', async (req, res) => {
  try {
    await Transaction.deleteMany({ personId: req.params.personId });
    res.json({ message: "Transactions deleted for person" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ==================== START SERVER ====================

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
