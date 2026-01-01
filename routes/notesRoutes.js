const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

/**
 * TEST ROUTE (IMPORTANT)
 * GET /api/notes
 */
router.get("/", (req, res) => {
  res.json({ message: "Notes API working ✅" });
});

/**
 * GET notes for a user
 * GET /api/notes/user/:userId
 */
router.get("/user/:userId", async (req, res) => {
  try {
    const notes = await Note.find({ user: req.params.userId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes" });
  }
});

module.exports = router;