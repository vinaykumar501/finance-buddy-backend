const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000; 


app.use(cors());
app.use(bodyParser.json());


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/financeBuddy', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


const Person = require('./models/Person');
const Transaction = require('./models/Transaction');

//check
app.get('/', (req, res) => {
  res.send('Hello from Finance Buddy backend!');
});


//add
app.post('/api/person', async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    await newPerson.save();
    res.status(201).json(newPerson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//all
app.get('/api/person', async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//up
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

// del
app.delete('/api/person/:id', async (req, res) => {
  try {
    const deleted = await Person.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ error: "Person not found" });
    res.json({ message: "Person deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//add
app.post('/api/transaction', async (req, res) => {
  try {
    const newTxn = new Transaction(req.body);
    await newTxn.save();
    res.status(201).json(newTxn);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//all
app.get('/api/transaction', async (req, res) => {
  try {
    const txns = await Transaction.find();
    res.json(txns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//del
app.delete('/api/transaction/:id', async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Transaction not found" });
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// del all
app.delete('/api/transaction/person/:personId', async (req, res) => {
  try {
    await Transaction.deleteMany({ personId: req.params.personId });
    res.json({ message: "Transactions deleted for person" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
