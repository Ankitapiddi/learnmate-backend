require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const notesRoutes = require("./routes/notesRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ ROOT ROUTE (THIS WAS MISSING)
app.get("/", (req, res) => {
  res.send("LearnMate backend is live 🚀");
});

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/chat", chatRoutes);

// DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});