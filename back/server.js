


import dotenv from "dotenv";
import express from "express";
import pkg from "pg";
import multer from "multer";
import cors from "cors";
import path from "path";
import bcrypt from "bcryptjs";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import jwt from "jsonwebtoken";



dotenv.config();
const { Pool } = pkg;
const app = express();
const PORT = 5000;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.connect().then(() => console.log("Connected to PostgreSQL"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3001", 
  credentials: true                
}));

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;


    const result = await pool.query("SELECT * FROM signup WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: user.user_id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: "2h" } // token valid for 1 hour
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1]; 
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}


app.post("/api/update-score", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { tech, score } = req.body;

  const techMap = {
    HTML: "html_score",
    CSS: "css_score",
    JavaScript: "js_score",
    React: "react_score",
    FLUTTER: "flutter_score",
  };
  const column = techMap[tech];
  if (!column) return res.status(400).json({ error: "Invalid tech" });

  const query = `UPDATE signup SET ${column}=$1 WHERE user_id=$2 RETURNING user_id, username, ${column}`;
  const result = await pool.query(query, [score, userId]);

  res.json({ message: `${tech} score updated!`, user: result.rows[0] });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
