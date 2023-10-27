const mg = require('mongoose');

// Create Schema.
const createQnModel = () => {
    const qnSchema = new mg.Schema({
        qn_num: { //"Primary Key"
            type: Number,
            unique: true, // Enforce uniqueness for customId
            required: true, // Ensure it's required, NOT NULL
        },
        title: String,
        description: String,
        category: String,
        complexity: String
    });
    return mg.model('question', qnSchema);
}
const Question = createQnModel();

// Connect to MongoDB.
const connectToDB = () => {
    mg.connect(process.env.DB_SERVER, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log(`QuestionManager's MongoDB running on port ${process.env.DB_PORT}.`))
        .catch(err => {
            console.log('Error connecting to DB. Exiting.');
            process.exit(1); //Connection retry logic is in Docker compose.
        });
};

module.exports = {
    Question,
    connectToDB
};
