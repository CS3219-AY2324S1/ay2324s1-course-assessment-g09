const Qns = require("../model/question");


const fetchQuestions = async (req, res) => {
    // Fetch all existing questions from the database.
    const questions = await Qns.find(); //Retrieve all questions from the database.
    res.json({questions}); //Create Response with questions as content.
}

const createQuestion = async (req, res) => {
    //Create a new question in the database.
    const {question_id, title, description, category, complexity} = req.body; //Extract attribs from request.

    try {
        const question = await Qns.create({
            question_id,
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
    // console.log(req.params._id);

    const _id = req.params._id;
    const {question_id, title, description, category, complexity} = req.body;

    await Qns.findByIdAndUpdate({_id}, {
        question_id,
        title,
        description,
        category,
        complexity
    }, {new:true});
    
 

    const question = await Qns.find({});

    res.json({question});
}

const deleteQuestion = async (req, res) => {
    //Delete a question from the database.
    const _id = req.params._id;
    // console.log(_id);
    await Qns.deleteOne({_id});
    res.json({success: "Record deleted"}); //Create Response with success message.
}

module.exports = {createQuestion, fetchQuestions, updateQuestion, deleteQuestion};