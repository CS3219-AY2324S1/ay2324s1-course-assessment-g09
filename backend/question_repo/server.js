// Load Env Variables
if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

// Import Dependencies
const express = require('express');
const cors = require('cors');
const questionController = require('./controllers/questionsController');
const connectToDatabase = require('./config/connectToDatabase');

// Create an express app
const app = express();

// Configure express app
app.use(express.json());
app.use(cors());

// Connect to Database
connectToDatabase();

app.post('/question', questionController.createQuestion);
app.get("/questions", questionController.fetchQuestions);
app.delete("/question/:id", questionController.deleteQuestion);
app.put("/question/:id", questionController.updateQuestion);

app.listen(process.env.PORT);

