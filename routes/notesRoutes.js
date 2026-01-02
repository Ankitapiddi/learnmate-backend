import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

// ✅ TEST ROUTE (already working)
router.get("/test", (req, res) => {
  res.json({ message: "Notes API working ✅" });
});

// ✅ GET ALL NOTES
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
});

// ✅ CREATE NOTE
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content required" });
    }

    const newNote = new Note({ title, content });
    await newNote.save();

    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ message: "Failed to create note" });
  }
});

export default router;