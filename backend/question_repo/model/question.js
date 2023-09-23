const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question_id: { //"Primary Key"
        type: String,
        unique: true, // Enforce uniqueness for customId
        required: true, // Ensure it's required, NOT NULL
      },
    title: String,
    description: String,
    category: String,
    complexity: String
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;