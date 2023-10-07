// This module initialises the UserManager module, by setting up the Postgresql Server + its associated RESTAPI interface.

// Load Env Variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
// Import dependencies
const express = require("express");
const bodyparser = require("body-parser"); // Middleware
const cors = require("cors") // Middleware
const usermanager = require("./usermanager");
const authRouter = require('./controllers/authentication');

// Create an express app
const app = express();

// Configure express app
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors({
  methods: ["GET", "POST"]
})); // WARN: Accepts any source origin!

//Setup Routing
app.use('/auth', authRouter);
// app.post("/users/create", usermanager.createUser); //CREATE
// app.get("/users/getall", usermanager.getUsers); // READ
// app.get("/users/get/:id", usermanager.getUserById);
// app.post("/users/update/:id", usermanager.updateUser); //UPDATE
// app.post("/users/delete/:id", usermanager.deleteUser); //DELETE

// Start Express App
app.listen(process.env.RESTAPI_PORT, () => {
  console.log(`UserManager running on port ${process.env.RESTAPI_PORT}.`);
});

// Initialise DB with default parameters.
// usermanager.initialiseDB();
