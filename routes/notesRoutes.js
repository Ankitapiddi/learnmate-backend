const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// ✅ TEST ROUTE (IMPORTANT)
router.get("/", (req, res) => {
  res.json({ message: "Notes API working ✅" });
});

// Create note
router.post("/", async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get notes by user
router.get("/:user", async (req, res) => {
  try {
    const notes = await Note.find({ user: req.params.user });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;