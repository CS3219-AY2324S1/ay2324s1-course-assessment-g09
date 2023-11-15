const { Question } = require('./db');

const random = (arr, n) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    return arr;
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result.sort((a, b) => a.qn_num - b.qn_num);
}

const getQuestions = async (request, response) => {
  // Get questions. Users could filter by category, complexity, etc.
  console.log("request", request.query);
  console.log("HELLOOO", request.query.complexity);

  const return_success = result => {
    const numQns = result.length;
    const msg = { 'msg': `${numQns} questions retrieved.`, 'qns': result };
    return response.status(200).json(msg);
  };
  const handle_error = (err) => {
    const msg = { 'msg': err.message, 'qns': null };
    return response.status(500).json(msg);
  };

  // 1. Check valid Schema.
  return Question.find(request.query)
    .then(data => request.params.qn_num ? random(data, request.params.qn_num) : data)
    .then(return_success)
    .catch(handle_error);
}

const createQuestion = async (request, response) => {
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

  const { qn_num, title, description, category, complexity } = request.body; //Extract attribs from request.
  const isAttributePresent = qn_num && title && description && category && complexity;
  if (!isAttributePresent) {
    const msg = { 'msg': `All fields must be filled.`, 'qn_num': null };
    return response.status(400).json(msg);
  }
  return Question.create(request.body)
    .then(return_success)
    .catch(handle_error);
};

const updateQuestion = async (request, response) => {
  // Update questions from given details. Users could update any field(s).
  const return_success = (result) => {
    if (!result) {
      const msg = { 'msg': `Question ${request.params.qn_num} does not exist.`, 'qn_num': null };
      return response.status(404).json(msg);
    } else {
      const msg = { 'msg': 'Question updated.', 'qn_num': request.params.qn_num };
      return response.status(200).json(msg);
    }
  };
  const handle_error = (err) => {
    const msg = { 'msg': err.message, 'qn_num': null };
    return response.status(500).json(msg);
  };

  return Question.findOneAndUpdate({ 'qn_num': request.params.qn_num }, request.body)
    .then(return_success)
    .catch(handle_error);
}

const deleteQuestion = async (request, response) => {

  const return_success = (result) => {
    if (!result) {
      const msg = { 'msg': `Question with qn_num ${request.params.qn_num} does not exist.`, 'qn_num': null };
      return response.status(404).json(msg);
    } else {
      const msg = { 'msg': 'Question deleted.', 'qn_num': request.params.qn_num };
      return response.status(200).json(msg);
    }
  };
  const handle_error = (err) => {
    const msg = { 'msg': err.message, 'qn_num': null };
    return response.status(500).json(msg);
  };

  // Delete questions from given question number.
  //1. Delete questions.
  return Question.findOneAndDelete({ 'qn_num': request.params.qn_num })
    .then(return_success)
    .catch(handle_error);
};

module.exports = {
  createQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
};
