const express = require("express");
const axios = require("axios");
const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post("/socratic-feedback", async (req, res) => {
  const { userCode, question } = req.body;

  const prompt = `
  You are a Socratic teaching assistant. A student has submitted the following code for the question: "${question}".
  Please provide feedback in a Socratic style by asking guiding questions to help the student debug or improve the code.

  Student's Code:
  ${userCode}
  `;

  try {
    const response = await axios.post(
      "https://api.gemini.com/v1/your-specific-endpoint", // Replace with the correct Gemini API endpoint
      {
        model: "gemini-model-name", // Replace with Gemini's model name
        prompt, // or appropriate request format for Gemini
        max_tokens: 50, // Adjust token limit based on Gemini's settings
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${GEMINI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Log and send the response as JSON
    console.log("Gemini Response:", response.data);
    res.json({ feedback: response.data.choices[0].message.content }); // Send structured response
  } catch (error) {
    console.error(
      "Error with Gemini API:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      error: error.response
        ? error.response.data
        : "Failed to generate feedback",
    });
  }
});

module.exports = router;
