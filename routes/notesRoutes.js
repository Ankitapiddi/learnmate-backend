const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// ✅ Test route
router.get("/test", (req, res) => {
  res.json({ message: "Notes API working ✅" });
});

// ✅ Get all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// ✅ Create a note
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "All fields required" });
    }

    const note = new Note({ title, content });
    await note.save();

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: "Failed to create note" });
  }
});

module.exports = router;