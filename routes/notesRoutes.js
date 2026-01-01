const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Note = require("../models/Note");

/* =========================
   TEST ROUTE (VERY IMPORTANT)
   ========================= */
router.get("/", (req, res) => {
  res.json({ message: "Notes API working ✅" });
});

/* =========================
   FILE UPLOAD CONFIG
   ========================= */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* =========================
   GET NOTES BY USER
   ========================= */
router.get("/:userId", async (req, res) => {
  try {
    const notes = await Note.find({ user: req.params.userId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes" });
  }
});

/* =========================
   CREATE NOTE
   ========================= */
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { title, content, user } = req.body;

    const newNote = new Note({
      title,
      content,
      user,
      file: req.file ? req.file.path : null,
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(500).json({ message: "Error creating note" });
  }
});

/* =========================
   DELETE NOTE
   ========================= */
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting note" });
  }
});

module.exports = router;