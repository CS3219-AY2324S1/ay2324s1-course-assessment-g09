import create from 'zustand'
import axios from 'axios';

const questionStr = create((set) => ({
    questions: null,

    fetchQuestions: async () => {
        // Fetch the notes
        const res = await axios.get('http://localhost:3001/questions');

        // Set to state
        set({questions: res.data.questions})
        
    },
}));

export default questionStr;