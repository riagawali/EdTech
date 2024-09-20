// backend/routes/userRoutes.js
const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Get user progress
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (user) {
      res.json(user.progress);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user progress" });
  }
});

// Update user's completed questions
router.post("/update-progress", async (req, res) => {
  const { userId, completedQuestion } = req.body;
  try {
    const user = await User.findById(userId);
    if (user) {
      user.progress.completedQuestions.push(completedQuestion);
      await user.save();
      res.json(user.progress);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update user progress" });
  }
});

module.exports = router;
