// This module initialises the UserManager module, by setting up the Postgresql Server + its associated RESTAPI interface.

// Load Env Variables
if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}
// Import dependencies
const express = require('express');
const bodyparser = require('body-parser'); // Middleware
const usermanager = require('./usermanager');

// Create an express app
const app = express();
// Configure express app
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
// Allow requests from 'http://localhost:3000'
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  

//Setup Routing
app.post('/users/create', usermanager.createUser); //CREATE
app.get('/users/getall', usermanager.getUsers); // READ
app.get('/users/get/:id', usermanager.getUserById);
app.post('/users/update/:id', usermanager.updateUser); //UPDATE
app.post('/users/delete/:id', usermanager.deleteUser); //DELETE

// Start Express App
app.listen(process.env.RESTAPI_PORT, () => {
    console.log(`UserManager running on port ${process.env.RESTAPI_PORT}.`);
});

// Initialise DB with default parameters.
usermanager.initialiseDB();