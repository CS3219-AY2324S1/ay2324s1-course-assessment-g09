// This module initialises the QuestionManager module, by setting up the MongoDB Server + its associated RESTAPI interface.

// Import Dependencies
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); // Load environment variables from .env file
}
const express = require('express');
const bodyparser = require('body-parser'); //Middlewares
const cors = require('cors'); //Middlewares
const adminQuestionRouter = require('./controllers/questionadmin'); //Routers
const userQuestionRouter = require('./controllers/questionuser'); //Routers
const { Attributes, Category, Complexity } = require('./utility/db'); // Database Properties

const isCorrectSchema = request => { // Input Sanitisation
    const checkQnNumParams = request.params.qn_num ? !isNaN(request.params.qn_num) : true;
    const checkKeySchema = Object.keys(request.body).every(key => key in Attributes);
    const checkQnNumBody = request.body.qn_num ? !isNaN(request.body.qn_num) : true;
    const checkCategoryEnum = request.body.category ? (request.body.category).every(category => Category.includes(category)) : true;
    const checkComplexityEnum = request.body.complexity ? Complexity.includes(request.body.complexity) : true;
    return checkQnNumParams && checkKeySchema && checkQnNumBody && checkCategoryEnum && checkComplexityEnum;
  };

const app = express(); // Create an express app
app.use(bodyparser.json()); // Parse JSON body
app.use(bodyparser.urlencoded({ extended: true })); // Parse URL-encoded body
app.use(cors()); // WARN: Accepts any source origin! // Configure CORS for future security configs.
app.use((request, response, next) => { // Input Sanitisation
    if (request.params.qn_num) { request.params.qn_num = parseInt(request.params.qn_num); }
    if (request.body.qn_num) { request.body.qn_num = parseInt(request.body.qn_num); }
    if (!isCorrectSchema(request)) {
        const msg = { 'msg': 'Incorrect schema. Please ensure that the fields are spelled correctly.' };
        return response.status(400).json(msg);
    }
    next();
});

// Main Endpoint /questions 
app.use('/admin/questions', adminQuestionRouter);
app.use('/questions', userQuestionRouter);

// Start Express App
const log_success = () => console.log(`QuestionManager's RESTAPI running on port ${process.env.RESTAPI_PORT}.`);
app.listen(process.env.RESTAPI_PORT, log_success);
