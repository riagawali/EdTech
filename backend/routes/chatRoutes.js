const express = require("express");
const axios = require("axios");
const router = express.Router();

const CHATGPT_API_KEY = process.env.CHATGPT_API_KEY;

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
      "https://api.openai.com/v1/chat/completions", // Use chat/completions endpoint for gpt-3.5-turbo or gpt-4
      {
        model: "gpt-3.5-turbo", // Updated model
        messages: [{ role: "system", content: prompt }], // chat API uses "messages" instead of "prompt"
        max_tokens: 50, // Increase token limit for more detailed feedback
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${CHATGPT_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Log and send the response as JSON
    console.log("OpenAI Response:", response.data);
    res.json({ feedback: response.data.choices[0].message.content }); // Send structured response
  } catch (error) {
    console.error(
      "Error with ChatGPT API:",
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
