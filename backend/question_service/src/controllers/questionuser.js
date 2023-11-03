const express = require('express');
const questionmanager = require('../utility/questionmanager');
const userQuestionRouter = express.Router();

// PATH: GET /questions
userQuestionRouter.get('/', questionmanager.getQuestions);

// PATH: GET /questions/:num_qn
userQuestionRouter.get('/:qn_num', questionmanager.getQuestions);

// PATH: POST /questions
userQuestionRouter.post('/', questionmanager.createQuestion);

// PATH: PUT /questions/:qn_num
userQuestionRouter.put('/:qn_num', questionmanager.updateQuestion);

// PATH: DELETE /questions/:qn_num
userQuestionRouter.delete('/:qn_num', questionmanager.deleteQuestion);

module.exports = userQuestionRouter;
