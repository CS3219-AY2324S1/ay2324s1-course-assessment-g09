const express = require('express');
const questionmanager = require('../utility/questionmanager');
const adminQuestionRouter = express.Router();

// PATH: GET /admin/questions
adminQuestionRouter.get('/', questionmanager.getQuestions);

// PATH: GET /admin/questions/:num_qn
adminQuestionRouter.get('/:qn_num', questionmanager.getQuestions);

// PATH: POST /admin/questions
adminQuestionRouter.post('/', questionmanager.createQuestion);

// PATH: PUT /admin/questions/:qn_num
adminQuestionRouter.put('/:qn_num', questionmanager.updateQuestion);

// PATH: DELETE /admin/questions/:qn_num
adminQuestionRouter.delete('/:qn_num', questionmanager.deleteQuestion);

module.exports = adminQuestionRouter;
