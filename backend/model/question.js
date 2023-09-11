const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true, // Enforce uniqueness for customId
        required: true, // Ensure it's required
      },
    title: String,
    description: String,
    category: String,
    complexity: String
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;