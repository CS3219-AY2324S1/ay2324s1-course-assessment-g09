const express = require('express');
const Question = require('../utility/db').Question;

const adminQuestionRouter = express.Router();

// PATH: /admin/questions/getall
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

// PATH: /admin/questions/create
adminQuestionRouter.post('/create', (request, response) => {
    console.log(request.body);
    const { title, description, category, complexity } = request.body; //Extract attribs from request.
    const qn_num = parseInt(request.body.qn_num);
    if (!request.body || !qn_num || !title || !description || !category || !complexity) {
        const msg = { 'msg': `All fields must be filled.`, 'qn_num': null };
        return response.status(400).json(msg);
    }

    Question.create({ qn_num, title, description, category, complexity }).then(() => {
        const msg = { 'msg': 'Question created.', 'qn_num': qn_num };
        return response.status(200).json(msg);
    }).catch(err => {
        const msg = { 'msg': err.message, 'qn_num': qn_num };
        return response.status(500).json(msg);
    });
});

// PATH: /admin/questions/update/:qn_num
adminQuestionRouter.post('/update/:qn_num', (request, response) => {
    const qn_num = parseInt(request.params.qn_num);
    if (!qn_num) {
        const msg = { 'msg': 'qn_num must be filled.', 'qn_num': null };
        return response.status(400).json(msg);
    }
    if (!request.body) {
        const msg = { 'msg': `At least a field must be filled.`, 'qn_num': null };
        return response.status(400).json(msg);
    }

    Question.findOneAndUpdate({ "qn_num": qn_num }, request.body).then(result => {
        if (!result) {
            const msg = { 'msg': `Question with qn_num ${qn_num} does not exist.`, 'qn_num': null };
            return response.status(404).json(msg);
        }
        const msg = { 'msg': 'Question updated.', 'qn_num': qn_num };
        return response.status(200).json(msg);
    }).catch(err => {
        const msg = { 'msg': err.message, 'qn_num': null };
        return response.status(500).json(msg);
    });
});

// PATH: /admin/questions/delete/:qn_num
adminQuestionRouter.post('delete/:qn_num', (request, response) => {
    const qn_num = parseInt(request.params.qn_num);
    if (!qn_num) {
        const msg = { 'msg': 'qn_num must be filled.', 'qn_num': null };
        return response.status(500).json(msg);
    }

    Question.findOneAndDelete({ "qn_num": qn_num }).then(result => {
        if (!result) {
            const msg = { 'msg': `Question with qn_num ${qn_num} does not exist.`, 'qn_num': null };
            return response.status(404).json(msg);
        } else {
            const msg = { 'msg': 'Question deleted.', 'qn_num': qn_num };
            return response.status(200).json(msg);
        }
    }).catch(err => {
        const msg = { 'msg': err.message, 'qn_num': null };
        return response.status(500).json(msg);
    });
});


module.exports = adminQuestionRouter;
