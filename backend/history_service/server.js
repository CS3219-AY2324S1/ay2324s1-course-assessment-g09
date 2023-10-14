const express = require("express");
const {
  connectToDB,
  createHistory,
  getAllHistory,
  getHistoryByUser,
} = require("./historyController");
const bodyparser = require("body-parser"); // Middleware
const cors = require("cors"); // Middleware

const app = express();
app.use(express.json());

// Configure express app
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(
  cors({
    methods: ["GET", "POST"],
  })
); // WARN: Accepts any source origin!

app.post("/history/create", createHistory); //CREATE
app.get("/history/getall", getAllHistory); // READ
app.get("/history/get/:user", getHistoryByUser); // READ

// Connect to MongoDB
connectToDB();

app.listen(process.env.DB_PORT, () => {
  console.log("History service listening on port " + process.env.DB_PORT);
});
