const express = require('express');
const Question = require('../utility/db').Question;

const adminQuestionRouter = express.Router();

adminQuestionRouter.get('/getall', (request, response) => {
    Question.find().then(result => {
        const numQns = result.length;
        const msg = { 'msg': `${numQns} questions retrieved.`, 'qns': result };
        return response.status(200).json(msg);
    }).catch(err => {
        const msg = { 'msg': err.message, 'qns': null };
        return response.status(500).json(msg);
    });
});

module.exports = adminQuestionRouter;
