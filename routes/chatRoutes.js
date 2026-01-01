const express = require("express");
const router = express.Router();

// import notes from notesRoutes
const notesRoutes = require("./notesRoutes");

router.post("/", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "No message received" });
  }

  const notes = notesRoutes.getNotes();

  let reply = "This is a general response.";

  if (notes.length > 0) {
    reply = `Based on your course notes (${notes.length} notes available), here is a response related to your query: "${message}"`;
  }

  res.json({ reply });
});

module.exports = router;
