const express = require("express");
const {
	connectToDB,
	createHistory,
	getAllHistory,
	getHistoryByUser,
	getDistinctByUser,
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

app.post("/create", createHistory); //CREATE
app.get("/getall", getAllHistory); // READ
app.get("/get/:user", getHistoryByUser); // READ
app.get("/getProgress/:user", getDistinctByUser);

// Connect to MongoDB
connectToDB();

app.listen(process.env.RESTAPI_PORT, () => {
	console.log("History service listening on port " + process.env.RESTAPI_PORT);
});
