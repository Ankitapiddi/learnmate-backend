import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";

dotenv.config();

const app = express();

/* =====================
   MIDDLEWARE
===================== */
app.use(cors());
app.use(express.json());

/* =====================
   ROOT CHECK
===================== */
app.get("/", (req, res) => {
  res.send("LearnMate backend running ✅");
});

/* =====================
   NOTES ROUTES MOUNT
===================== */
app.use("/api/notes", notesRoutes);

/* =====================
   MONGODB CONNECTION
===================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err.message));

/* =====================
   SERVER START
===================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});