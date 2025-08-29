require("dotenv").config();// adjust path as needed
const express = require('express');
const { Pool } = require('pg');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 5000;
const bcrypt = require("bcryptjs");






const requiredEnv = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Missing environment variable: ${key}`);
    process.exit(1);
  }
});
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => {
    console.error('Database connection error:', err.message);
    process.exit(1);
  });
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    
    const existing = await pool.query("SELECT * FROM signup WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    await pool.query(
      "INSERT INTO signup (username, email, password) VALUES ($1, $2, $3)",
      [username, email, hashedPassword]
    );

    res.json({ message: "Signup successful!" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));