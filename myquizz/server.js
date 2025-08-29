const express = require("express");

import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import certificatesRouter from "./routes/certificates.js";

dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.json({ ok: true, service: "certificates-api" });
});

app.use("/api/certificates", certificatesRouter);

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`✅ Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error", err);
    process.exit(1);
  });
