// This module initialises the QuestionManager module, by setting up the MongoDB Server + its associated RESTAPI interface.

// Import Dependencies
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); // Load environment variables from .env file
}
const express = require('express');
const bodyparser = require('body-parser'); // Middleware
const cors = require('cors'); // Middleware
const questionmanager = require('./questionmanager');
const adminQuestionRouter = require('./controllers/questionadmin');

// Create an express app
const app = express();
// Configure express app
app.use(bodyparser.json()); // Parse JSON body
app.use(bodyparser.urlencoded({ extended: true })); // Parse URL-encoded body
// Configure CORS for future security configs.
app.use(cors()); // WARN: Accepts any source origin!    

// Main Endpoint /questions 
app.use('/admin/questions', adminQuestionRouter);
app.get('/questions', questionmanager.getQuestions);
app.get('/questions/random', questionmanager.getRandomQuestion);
// app.post('/questions', questionmanager.createQuestion);
// app.put('/questions/:qn_num', questionmanager.updateQuestion);
// app.delete('/questions/:qn_num', questionmanager.deleteQuestion);

// Start Express App
const log_success = () => console.log(`QuestionManager's RESTAPI running on port ${process.env.RESTAPI_PORT}.`);
app.listen(process.env.RESTAPI_PORT, log_success);
