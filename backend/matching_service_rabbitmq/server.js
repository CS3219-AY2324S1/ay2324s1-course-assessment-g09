// import dependencies required for Express.js, cors
const express = require('express');
const cors = require('cors');
const { findMatch } = require('./rabbitmqMatchingController');

// Initialize Express.js app and store in app variable
const app = express();

// Enable CORS
app.use(cors());

// Allow requests from http://localhost:3000
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST'], // Specify the allowed HTTP methods
}));

app.post('/findMatch', findMatch);

// Configure Express.js app to run at port 1317 (MQ = 1317)
const PORT = 1317;
app.listen(PORT, () => {
    console.log(`RabbitMQ matching service server is running on port ${PORT}.`);
})