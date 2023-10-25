// This module initialises the QuestionManager module, by setting up the MongoDB Server + its associated RESTAPI interface.

// Load Env Variables
if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

// Import Dependencies
const express = require('express');
const bodyparser = require('body-parser'); // Middleware
const cors = require('cors'); // Middleware
const questionmanager = require('./questionmanager');
const connectToDB = require('./utility/db').connectToDB;
const adminQuestionRouter = require('./controllers/questionadmin');

// Create an express app
const app = express();

// Configure express app
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(cors({
    methods: ['GET', 'POST']
})); // WARN: Accepts any source origin!

app.use('/admin', adminQuestionRouter);
app.post('/questions/create', questionmanager.createQuestion); //CREATE
app.get('/questions/getall', questionmanager.getQuestions); // READ
app.get('/questions/get/:qn_num', questionmanager.getQuestionByQnNum);
app.post('/questions/update/:qn_num', questionmanager.updateQuestion); //UPDATE
app.post('/questions/delete/:qn_num', questionmanager.deleteQuestion); //DELETE')

// Start Express App
app.listen(process.env.RESTAPI_PORT, () => {
    console.log(`QuestionManager running on port ${process.env.RESTAPI_PORT}.`);
});

// Connect to MongoDB .
// questionmanager.connectToDB();
connectToDB();
