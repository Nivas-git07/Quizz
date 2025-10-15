


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

// const allowedOrigins = [  // React dev server
//      // Production domain
// ];

app.use(cors({
  origin: '*',
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
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
      { expiresIn: "2h" }
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


app.post("/update-score", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { tech, score } = req.body;

  const techMap = {
    HTML: "html_score",
    CSS: "css_score",
    JavaScript: "js_score",
    "React JS": "react_score",
    Flutter: "flutter_score",
    Flutterapp: "flutter_score",
  };
  const column = techMap[tech];
  if (!column) return res.status(400).json({ error: "Invalid tech" });

  const query = `UPDATE signup SET ${column}=$1 WHERE user_id=$2 RETURNING user_id, username, ${column}`;
  const result = await pool.query(query, [score, userId]);

  res.json({ message: `${tech} score updated!`, user: result.rows[0] });
});

app.post("/certificates", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { studentName, rollNo, technology, score, date, sharedVia } =
      req.body;

    const result = await pool.query(
      "INSERT INTO certificate (user_id, student, rollno , technology, score, date,sharedvia) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [userId, studentName, rollNo, technology, score, date, sharedVia]
    );
    res.status(201).json(result.rows[0]);


  }
  catch (err) {
    console.error("Create certificate error:", err);
    return res.status(500).json({ message: "Server error." });
  }
}
);
app.get("/getdetails", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query("SELECT student, rollno, technology, score, date, sharedvia FROM certificate");
    const mapped = result.rows.map(r => ({
      studentName: r.student,
      rollNo: r.rollno,
      technology: r.technology,
      score: r.score,
      date: r.date,
      sharedVia: r.sharedvia ? r.sharedvia.split(",") : [] // if stored as CSV
    }));

    res.json(mapped);
  } catch (err) {
    console.error("Fetch details error:", err);
    res.status(500).json({ error: "Server error" });
  }
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
