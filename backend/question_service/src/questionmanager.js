const mg = require('mongoose');
const Question = require('./utility/db').Question;
// // Create Schema.
// const createQnModel = () => {
//   const qnSchema = new mg.Schema({
//     qn_num: { //"Primary Key"
//         type: Number,
//         unique: true, // Enforce uniqueness for customId
//         required: true, // Ensure it's required, NOT NULL
//       },
//     title: String,
//     description: String,
//     category: String,
//     complexity: String
//   });
//   return mg.model('question', qnSchema);
// }
// const Question = createQnModel();

// // Connect to MongoDB.
// const connectToDB = () => {
//   mg.connect(process.env.DB_SERVER, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log(`QuestionManager's MongoDB running on port ${process.env.DB_PORT}.`))
//     .catch(err => {
//       console.log('Error connecting to DB. Exiting.');
//       process.exit(1); //Connection retry logic is in Docker compose.
//     });
//   };

const createQuestion = (request, response) => {
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
};

const getQuestions = (request, response) => {
  Question.find().then(result => {
    const numQns = result.length;
    const msg = { 'msg': `${numQns} questions retrieved.`, 'qns': result };
    return response.status(200).json(msg);
  }).catch(err => {
    const msg = { 'msg': err.message, 'qns': null };
    return response.status(500).json(msg);
  });
};

const getQuestionByQnNum = (request, response) => {
  const qn_num = parseInt(request.params.qn_num);
  if (!qn_num) {
    const msg = { 'msg': 'Question id must be filled.', 'qn': null };
    return response.status(500).json(msg);
  }

  Question.findOne({ "qn_num": qn_num }).then(result => {
    if (!result) {
      const msg = { 'msg': `Question with qn_num ${qn_num} does not exist.`, 'qn': null };
      return response.status(404).json(msg);
    }
    const msg = { 'msg': 'Question retrieved.', 'qn': result };
    return response.status(200).json(msg);
  }).catch(err => {
    const msg = { 'msg': err.message, 'qn': null };
    return response.status(500).json(msg);
  });
};

const updateQuestion = (request, response) => {
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
}

const deleteQuestion = (request, response) => {
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
};

module.exports = {
  // connectToDB,
  createQuestion,
  getQuestions,
  getQuestionByQnNum,
  updateQuestion,
  deleteQuestion,
};
