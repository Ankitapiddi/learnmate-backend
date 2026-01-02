import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

// TEST ROUTE
router.get("/test", (req, res) => {
  res.json({ message: "Notes API working ✅" });
});

// GET all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE note
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title & content required" });
    }

    const note = new Note({ title, content });
    await note.save();

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;