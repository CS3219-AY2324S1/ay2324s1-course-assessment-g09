// Load Env Variables
if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

// Import dependencies
const express = require('express');
const bodyparser = require('body-parser'); // Middleware
const db = require('./queries');

// Create an express app
const app = express();

// Configure express app
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//TODO: Fill this up!
app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

// Start express app
app.listen(process.env.RESTAPI_PORT, () => {
    console.log(`PostgreSQL running on port ${process.env.RESTAPI_PORT}.`);
});;