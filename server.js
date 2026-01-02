import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// 🔴 ROOT TEST (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("LearnMate backend is running ✅");
});

// routes
app.use("/api/notes", notesRoutes);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

// PORT (Railway compatible)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});