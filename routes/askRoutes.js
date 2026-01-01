const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// POST /api/ask
router.post("/", async (req, res) => {
  try {
    const { question, user } = req.body;

    if (!question || !user) {
      return res.status(400).json({ message: "Question and user required" });
    }

    const notes = await Note.find({ user });

    if (notes.length === 0) {
      return res.json({ answer: "No notes available to answer from." });
    }

    // simple keyword matching
    let bestNote = notes[0];
    let maxScore = 0;

    notes.forEach((note) => {
      let score = 0;
      const qWords = question.toLowerCase().split(" ");
      const noteText = (note.title + " " + note.content).toLowerCase();

      qWords.forEach((word) => {
        if (noteText.includes(word)) score++;
      });

      if (score > maxScore) {
        maxScore = score;
        bestNote = note;
      }
    });

    res.json({
      answer: bestNote.content,
      source: bestNote.title,
    });
  } catch (err) {
    res.status(500).json({ message: "Error processing question" });
  }
});

module.exports = router;
