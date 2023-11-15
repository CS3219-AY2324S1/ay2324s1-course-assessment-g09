// This module initialises the UserManager module, by setting up the Postgresql Server + its associated RESTAPI interface.

// Load Env Variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
// Import dependencies
const express = require("express");
const bodyparser = require("body-parser"); // Middleware
const cors = require("cors") // Middleware
const userRouter = require('./controllers/user');
const userAuthRouter = require('./controllers/auth');
const userAdminRouter = require('./controllers/admin');
const initialiseDB = require("./utility/db").initialiseDB;
const logger = require("./middleware/logger");


// Create an express app
const app = express();

// Configure express app
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors({
  methods: ["GET", "POST"]
})); // WARN: Accepts any source origin!
app.use(logger);

//Setup Routing
app.use('/users', userRouter);
app.use('/auth', userAuthRouter);
app.use('/admin/users', userAdminRouter);


// Start Express App
app.listen(process.env.RESTAPI_PORT, () => {
  console.log(`UserManager running on port ${process.env.RESTAPI_PORT}.`);
});

// Initialise DB with default parameters.
initialiseDB();
