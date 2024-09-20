const mongoose = require("mongoose");
const Question = require("../models/Question");
require("dotenv").config(); // Ensure environment variables are loaded

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

const removeDuplicateQuestions = async () => {
  try {
    // Find all questions with the topic "Linked List"
    const linkedListQuestions = await Question.find({ topic: "Linked List" });

    // Create a map to track unique questions by name and difficulty
    const uniqueQuestionsMap = {};

    linkedListQuestions.forEach((question) => {
      const key = `${question.name}-${question.difficulty}`;

      if (!uniqueQuestionsMap[key]) {
        // If the question is not in the map, add it
        uniqueQuestionsMap[key] = question._id;
      } else {
        // If the question is already in the map, remove the duplicate
        Question.findByIdAndDelete(question._id, (err) => {
          if (err) {
            console.log(`Error deleting duplicate question: ${question.name}`);
          } else {
            console.log(`Deleted duplicate question: ${question.name}`);
          }
        });
      }
    });

    console.log("Duplicate removal completed.");
    mongoose.connection.close();
  } catch (error) {
    console.log("Error removing duplicates:", error);
  }
};

// Run the function to remove duplicate questions
removeDuplicateQuestions();
