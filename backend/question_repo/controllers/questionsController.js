const Qns = require("../model/question");


const fetchQuestions = async (req, res) => {
    // Fetch all existing questions from the database.
    const questions = await Qns.find(); //Retrieve all questions from the database.
    res.json({questions}); //Create Response with questions as content.
}

const createQuestion = async (req, res) => {
    //Create a new question in the database.
    const {id, title, description, category, complexity} = req.body; //Extract attribs from request.

    try {
        const question = await Qns.create({
            id,
            title,
            description,
            category,
            complexity
        }); //Create a new question in the database.
        res.json({question}); //Create Response with question as content.
    } catch (error) {
        console.error("ERROR", error);
    }    
};

const updateQuestion = async (req, res) => {
    const questionId = req.params.id; //ID of question to update.
    const {id, title, description, category, complexity} = req.body; //Attribs from request,

    await Qns.findByIdAndUpdate(questionId, {
        id,
        title,
        description,
        category,
        complexity
    });

    const question = await Qns.findById(questionId);

    res.json({question});
}

const deleteQuestion = async (req, res) => {
    //Delete a question from the database.
    const questionId = req.params.id; //Retrieve the question ID from the request.
    await Qns.deleteOne({id: questionId}); //Delete the question from the database by ID.
    res.json({success: "Record deleted"}); //Create Response with success message.
}

module.exports = {createQuestion, fetchQuestions, updateQuestion, deleteQuestion};