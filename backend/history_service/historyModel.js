const mongoose = require("mongoose");

// Define a schema for your collection
const historySchema = new mongoose.Schema(
  {
    user1: {
      type: String,
      required: true,
    },
    user2: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    questionName: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create a model based on the schema
const history = mongoose.model("history", historySchema);

module.exports = history;
