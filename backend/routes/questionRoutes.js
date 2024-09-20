const express = require("express");
const Question = require("../models/Question"); // Import the Question model
const router = express.Router();

// Fetch questions by topic and difficulty
router.get("/", async (req, res) => {
  const { topic, difficulty } = req.query;
  try {
    const questions = await Question.find({
      topic: topic,
      difficulty: difficulty,
    });
    res.json(questions); // Send back the list of questions matching the topic and difficulty
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

// Other routes can also use this Question model...

module.exports = router;
