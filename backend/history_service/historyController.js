const mg = require("mongoose");
const History = require("./historyModel");

if (process.env.NODE_ENV != "production") {
	require("dotenv").config();
}

async function connectToDB() {
	mg.connect(process.env.DB_SERVER, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
		.then(() =>
			console.log(`MongoDB for history running on port ${process.env.DB_PORT}.`)
		)
		.catch((err) => {
			console.log("Error connecting to DB. Exiting.");
			process.exit(1); //Connection retry logic is in Docker compose.
		});
}

async function createHistory(req, res) {
	const {
		user1,
		user2,
		difficulty,
		questionName,
		question,
		language,
		theme,
		code,
	} = req.body;
	console.log(req.body);
	try {
		const history = await History.create({
			user1,
			user2,
			difficulty,
			questionName,
			question,
			language,
			theme,
			code,
		});
		res.status(200).json(history);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function getAllHistory(req, res) {
	try {
		const history = await History.find();
		res.status(200).json(history);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function getHistoryByUser(req, res) {
	const user = req.params.user;
	console.log(user);
	try {
		const history = await History.find({ user1: user });
		res.status(200).json(history);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function getDistinctByUser(req, res) {
	const user = req.params.user;
	console.log(user);
	try {
		const history = await History.aggregate([
			{
				$match: {
					user1: user,
				},
			},
			{
				$group: {
					_id: "$difficulty",
					entries: { $addToSet: "$questionName" },
				},
			},
			{
				$project: {
					_id: 1,
					distinctCount: { $size: "$entries" }, // Count the number of distinct values
				},
			},
		]);
		const distinctCountMap = {
			Easy: 0,
			Medium: 0,
			Hard: 0,
		};
		history.forEach((element) => {
			distinctCountMap[element._id] = element.distinctCount;
		});
		console.log(distinctCountMap);
		res.status(200).json(distinctCountMap);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
module.exports = {
	connectToDB,
	createHistory,
	getAllHistory,
	getHistoryByUser,
	getDistinctByUser,
};
