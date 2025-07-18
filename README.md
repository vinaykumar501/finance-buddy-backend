# 🧠 Finance Buddy - Backend

This is the backend for **Finance Buddy**, a full-stack personal finance tracker app. It is built with **Node.js**, **Express.js**, and **MongoDB** (via Mongoose), providing a RESTful API to manage people and their financial transactions.

### 🔗 Live API
🌐 [https://finance-buddy-backend.onrender.com](https://finance-buddy-backend.onrender.com)

---

## 🛠️ Technologies Used
- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- Mongoose (ODM)
- CORS & Body-parser
- Hosted on Render

---

## 📦 Features
- REST API for managing persons and transactions
- Full CRUD for persons (Add, View, Update, Delete)
- Full CRUD for transactions (Add, View, Delete)
- Delete all transactions for a given person
- Mongoose schema validation
- Environment variable support for MongoDB URI

---

## 📁 Project Structure
```
finance-buddy-backend/
├── models/
│   ├── Person.js         # Person Schema
│   └── Transaction.js    # Transaction Schema
├── server.js             # Main Express app
├── package.json
├── .gitignore
```

---

## 📂 API Endpoints

### 🔸 Person Routes

| Method | Endpoint              | Description              |
|--------|------------------------|--------------------------|
| GET    | /api/person           | Get all persons          |
| POST   | /api/person           | Add a new person         |
| PUT    | /api/person/:id       | Update person by ID      |
| DELETE | /api/person/:id       | Delete person by ID      |

### 🔸 Transaction Routes

| Method | Endpoint                            | Description                         |
|--------|--------------------------------------|-------------------------------------|
| GET    | /api/transaction                    | Get all transactions                |
| POST   | /api/transaction                    | Add a new transaction               |
| DELETE | /api/transaction/:id                | Delete a transaction by `_id`       |
| DELETE | /api/transaction/person/:personId  | Delete all transactions for person  |

---

## 🚀 Setup Instructions

### 🔧 Prerequisites
- Node.js installed
- MongoDB Atlas URI (or local MongoDB)

### 🧪 Run Locally
```bash
git clone https://github.com/vinaykumar501/finance-buddy-backend.git
cd finance-buddy-backend
npm install

# Create a `.env` file and add your MongoDB URI
echo "MONGODB_URI=your_mongodb_connection_string" > .env

# Start the server
node server.js
```

---

## 🌐 Connect with Frontend

The frontend fetches data from:
```
https://finance-buddy-backend.onrender.com/api/person
https://finance-buddy-backend.onrender.com/api/transaction
```

👉 Frontend Repo: [https://github.com/vinaykumar501/finance-buddy-frontend](https://github.com/vinaykumar501/finance-buddy-frontend)  
👉 Live Frontend: [https://vinaykumar501.github.io/finance-buddy-frontend/](https://vinaykumar501.github.io/finance-buddy-frontend/)

---

## 👨‍💻 Author
Made with ❤️ by [Vinay Kumar](https://github.com/vinaykumar501)
