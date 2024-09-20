const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  topic: String,
  difficulty: String,
  name: String,
  problemStatement: String,
  examples: [
    {
      input: String,
      output: String,
      explanation: String,
    },
  ],
  timeComplexity: String,
  spaceComplexity: String,
  constraints: String,
});

module.exports = mongoose.model("Question", questionSchema);
