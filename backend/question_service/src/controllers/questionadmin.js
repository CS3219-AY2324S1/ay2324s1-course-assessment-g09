const express = require('express');
const { Question, Attributes } = require('../connectdb');

const isCorrectSchema = (inputJSON) => Object.keys(inputJSON).every(key => key in Attributes);

const adminQuestionRouter = express.Router();

// PATH: /admin/questions/getall
adminQuestionRouter.get('/', async (request, response) => {
    // Get questions. Users could filter by category, complexity, etc.

    const return_success = (result) => {
        const numQns = result.length;
        const msg = { 'msg': `${numQns} questions retrieved.`, 'qns': result };
        return response.status(200).json(msg);
    };
    const handle_error = (err) => {
        const msg = { 'msg': err.message, 'qns': null };
        return response.status(500).json(msg);
    };

    if (!isCorrectSchema(request.body)) {
        const msg = { 'msg': 'Incorrect schema. Please ensure that the fields are spelled correctly.', 'qns': null };
        return response.status(400).json(msg);
    }
    const isQnNumInvalid = ('qn_num' in request.body) && isNaN(parseInt(request.body['qn_num']));
    if (isQnNumInvalid) {
        const msg = { 'msg': 'Question Number must be an integer.', 'qns': null };
        return response.status(400).json(msg);
    };
    if ('qn_num' in request.body) {
        request.body['qn_num'] = parseInt(request.body['qn_num']);
    }
    return Question.find(request.body)
        .then(return_success)
        .catch(handle_error);
});

// PATH: /admin/questions/create
adminQuestionRouter.post('/', async (request, response) => {
    // Create questions from given details.

    const return_success = (result) => {
        const msg = { 'msg': 'Question created.', 'qn_num': result.qn_num };
        return response.status(200).json(msg);
    };
    const handle_error = (err) => {
        //Primarily to catch Duplicate Question Number
        const msg = { 'msg': err.message, 'qn_num': null };
        return response.status(500).json(msg);
    };

    const { title, description, category, complexity } = request.body; //Extract attribs from request.
    const isAttributePresent = request.body.qn_num && title && description && category && complexity;
    if (!isAttributePresent) {
        const msg = { 'msg': `All fields must be filled.`, 'qn_num': null };
        return response.status(400).json(msg);
    }
    const isQnNumInvalid = ('qn_num' in request.body) && isNaN(parseInt(request.body.qn_num));
    if (isQnNumInvalid) {
        const msg = { 'msg': 'Question Number must be an integer.', 'qn_num': null };
        return response.status(400).json(msg);
    };
    const qn_num = parseInt(request.body.qn_num);
    const new_qn = { qn_num, title, description, category, complexity };
    return Question.create(new_qn)
        .then(return_success)
        .catch(handle_error);
});

// PATH: /admin/questions/update/:qn_num
adminQuestionRouter.put('/:qn_num', async (request, response) => {
    // Update questions from given details. Users could update any field(s).

    const return_success = (result) => {
        if (!result) {
            const msg = { 'msg': `Question ${qn_num} does not exist.`, 'qn_num': null };
            return response.status(404).json(msg);
        } else {
            const msg = { 'msg': 'Question updated.', 'qn_num': qn_num };
            return response.status(200).json(msg);
        }
    };
    const handle_error = (err) => {
        const msg = { 'msg': err.message, 'qn_num': null };
        return response.status(500).json(msg);
    };

    // 1. Check valid Schema.
    const isQnNumInvalid = isNaN(parseInt(request.params.qn_num));
    if (isQnNumInvalid) {
        const msg = { 'msg': 'Question Number must be an integer.', 'qn_num': null };
        return response.status(400).json(msg);
    };
    const qn_num = parseInt(request.params.qn_num);

    if (!isCorrectSchema(request.body)) {
        const msg = { 'msg': 'Incorrect schema. Please ensure that all fields are valid.', 'qns': null };
        return response.status(400).json(msg);
    }
    // 2. Parse Question Number as integer
    const isQnNumInvalid_Body = ('qn_num' in request.body) && isNaN(parseInt(request.body.qn_num));
    if (isQnNumInvalid_Body) {
        const msg = { 'msg': 'Question Number must be an integer.', 'qn_num': null };
        return response.status(400).json(msg);
    };
    if ('qn_num' in request.body) {
        request.body['qn_num'] = parseInt(request.body['qn_num']);
    }
    // 3. Update Questions
    return Question.findOneAndUpdate({ "qn_num": qn_num }, request.body)
        .then(return_success)
        .catch(handle_error);
});

// PATH: /admin/questions/delete/:qn_num
adminQuestionRouter.delete('/:qn_num', async (request, response) => {

    const return_success = (result) => {
        if (!result) {
            const msg = { 'msg': `Question with qn_num ${qn_num} does not exist.`, 'qn_num': null };
            return response.status(404).json(msg);
        } else {
            const msg = { 'msg': 'Question deleted.', 'qn_num': qn_num };
            return response.status(200).json(msg);
        }
    };
    const handle_error = (err) => {
        const msg = { 'msg': err.message, 'qn_num': null };
        return response.status(500).json(msg);
    };

    // Delete questions from given question number.
    // 1. Check valid Schema.
    const isQnNumInvalid = isNaN(parseInt(request.params.qn_num));
    if (isQnNumInvalid) {
        const msg = { 'msg': 'Question Number must be an integer.', 'qn_num': null };
        return response.status(400).json(msg);
    };
    const qn_num = parseInt(request.params.qn_num);
    //1. Delete questions.
    return Question.findOneAndDelete({ "qn_num": qn_num })
        .then(return_success)
        .catch(handle_error);
});


module.exports = adminQuestionRouter;
