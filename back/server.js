// require("dotenv").config();// adjust path as needed
// const express = require('express');
// const { Pool } = require('pg');
// const multer = require('multer');
// const cors = require('cors');
// const path = require('path');
// const app = express();
// const PORT = 5000;
// const bcrypt = require("bcryptjs");
// const session = require("express-session");
// const PgSession = require("connect-pg-simple")(session);



import dotenv from "dotenv";
import express from "express";
import pkg from "pg";
import multer from "multer";
import cors from "cors";
import path from "path";
import bcrypt from "bcryptjs";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";

dotenv.config();

const { Pool } = pkg;
const app = express();
const PORT = 5000;



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
const PgSession = connectPgSimple(session);
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(session({
  store: new PgSession({
    pool: pool,
    tableName: "user_sessions",
  }),
  secret: "supersecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
    secure: false,
  },
}));

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
    req.session.userId = user.user_id;
    req.session.username = user.username;
    console.log("Session after login:", req.session);
    console.log("User logged in:", user.username);
    res.json({ message: "Login successful", user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));

