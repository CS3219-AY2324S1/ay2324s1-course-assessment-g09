const mg = require('mongoose');

// Connect to MongoDB.
const connectToDB = () => {
  const log_success = () => console.log(`QuestionManager's MongoDB running on port ${process.env.DB_PORT}.`);   
  const handle_error = (err) => {
    console.log(`Error connecting to DB. Exiting. ${err}`);
    process.exit(1); //Connection retry logic is in Docker compose.
  };

  mg.connect(process.env.DB_SERVER, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(log_success)
    .catch(handle_error);
};

// Make Question Schema
const createQnModel = () => {
  const qnSchema = new mg.Schema({
    qn_num: { //"Primary Key"
        type: Number,
        unique: true, // Enforce uniqueness for customId
        required: true, // Ensure it's required, NOT NULL
      },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    complexity: {
        type: String,
        required: true,
    }
  });
  return mg.model('question', qnSchema);
};

connectToDB();
const Question = createQnModel();
const Attributes = Question.schema.paths;

module.exports = {
    Question,
    Attributes
};