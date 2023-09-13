const Qns = require("../model/question");




const fetchQuestions = async (req, res) => {
    const questions = await Qns.find();

    res.json({questions});
}




const createQuestion = async (req, res) => {
    const {id, title, description, category,complexity} = req.body;

    try {
        const question = await Qns.create({
            id,
            title,
            description,
            category,
            complexity
        });
        res.json({question});
    } catch (error) {
        console.error("ERROR", error);
    }
    

    
};

const updateQuestion = async (req, res) => {
    const questionId = req.params.id;

    const {id, title, description, category, complexity} = req.body;

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
    const questionId = req.params.id;
    

    await Qns.deleteOne({id: questionId});

    res.json({success: "Record deleted"});
}



module.exports = {createQuestion, fetchQuestions, updateQuestion, deleteQuestion};