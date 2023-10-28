const express = require('express');
const questionmanager = require('../questionmanager');


const adminQuestionRouter = express.Router();

// PATH: /admin/questions/getall
adminQuestionRouter.get('/', questionmanager.getQuestions);

// PATH: /admin/questions/create
adminQuestionRouter.post('/', questionmanager.createQuestion);

// PATH: /admin/questions/update/:qn_num
adminQuestionRouter.put('/:qn_num', questionmanager.updateQuestion);

// PATH: /admin/questions/delete/:qn_num
adminQuestionRouter.delete('/:qn_num', questionmanager.deleteQuestion);


module.exports = adminQuestionRouter;
