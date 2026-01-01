const express = require("express");
const router = express.Router();
const multer = require("multer");
const Note = require("../models/Note");

// ---------- FILE UPLOAD CONFIG ----------
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ---------- GET NOTES ----------
router.get("/:user", async (req, res) => {
  try {
    const notes = await Note.find({ user: req.params.user }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes" });
  }
});

// ---------- ADD TEXT NOTE ----------
router.post("/", async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "Error saving note" });
  }
});

// ---------- DELETE NOTE ----------
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

// ---------- UPLOAD FILE ----------
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const note = new Note({
      title: req.file.originalname,
      content: "Uploaded file",
      filePath: req.file.path,
      user: req.body.user,
    });

    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "File upload failed" });
  }
});

module.exports = router;
