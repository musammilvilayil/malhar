const path = require("path");
const crypto = require("crypto");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const validator = require("validator");
const connectDB = require("./src/config/db");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const app = express();
const port = process.env.PORT || 4000;

const contactSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: "", trim: true },
    message: { type: String, required: true, trim: true },
    created_at: { type: String, required: true },
  },
  { collection: "contacts", versionKey: false },
);

const Contact = mongoose.model("Contact", contactSchema);

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : "*",
  }),
);
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));
app.use(morgan("dev"));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later." },
  }),
);

app.get("/", (_req, res) => {
  res.json({ message: "Malhar contact service is running." });
});

app.get("/api", (_req, res) => {
  res.json({ message: "Malhar API" });
});

app.post("/api/contact", async (req, res, next) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim();
    const phone = String(req.body.phone || "").trim();
    const message = String(req.body.message || "").trim();

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email and message are required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }
    if (name.length > 120 || email.length > 254 || phone.length > 40 || message.length > 5000) {
      return res.status(400).json({ error: "One or more fields are too long" });
    }

    await Contact.create({
      id: crypto.randomUUID(),
      name,
      email,
      phone,
      message,
      created_at: new Date().toISOString(),
    });

    return res.status(201).json({
      success: true,
      message: "Thank you. Your message has been received.",
    });
  } catch (error) {
    return next(error);
  }
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: "Server error" });
});

async function start() {
  await connectDB();
  app.listen(port, () => {
    console.log(`Malhar contact service running on http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
