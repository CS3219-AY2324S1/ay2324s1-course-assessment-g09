// Load env variables
if (process.env.NODE_ENV != 'production') {
    require("dotenv").config();
}

const mg = require('mongoose');

async function connectToDatabase() {
    // Connect to the database.
    try {
        await mg.connect(process.env.DB_URL); //Connect to the database.
        console.log("Connected to database");
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectToDatabase;