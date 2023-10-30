// This module initialises the UserManager module, by setting up the Postgresql Server + its associated RESTAPI interface.

// Load Env Variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
// Import dependencies
const express = require("express");
const bodyparser = require("body-parser"); // Middleware
const cors = require("cors") // Middleware
const authRouter = require('./controllers/authentication');
const apiAuthRouter = require('./controllers/apitauth');
const logger = require('./middleware/logger');
const cookieParser = require('cookie-parser');

// Create an express app
const app = express();

// Configure express app
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors({
  methods: ["GET", "POST"],
  credentials: true,
})); // WARN: Accepts any source origin!
app.use(cookieParser());
app.use(logger);

//Setup Routing
app.use('/userauth', authRouter);
app.use('/apiauth', apiAuthRouter);

// Start Express App
app.listen(process.env.RESTAPI_PORT, () => {
  console.log(`Authentication Service running on port ${process.env.RESTAPI_PORT}.`);
});

