// Push qn data to QuestionService
const axios = require("axios");

const pushQns = async (qns) => {
    const url = "http://localhost:3001/questions/create";

    for (const qn of qns) {
        const qnData = {
            "id": qn.id,
            "title": qn.title,
            "difficulty": qn.difficulty,
            "url": qn.url,
        };
        const response = await axios.post(url, qnData);
        if (response.status !== 201) {
            console.log("Warning: Error pushing qn to QuestionService");
        }   
    }
}

