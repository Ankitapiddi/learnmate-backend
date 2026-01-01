const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      _id: "1",
      title: "First Note",
      content: "Backend is connected 🎉"
    },
    {
      _id: "2",
      title: "Second Note",
      content: "notes.map error fixed ✅"
    }
  ]);
});

module.exports = router;