if (process.env.NODE_ENV != "production") {
	require("dotenv").config();
}

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { sendToQueue } = require("./publisher");
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: process.env.ORIGIN,
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log("a user connected:", socket.id);
	socket.on("match", (data) => {
		const { condition, difficulty, user, videoSocket } = data;
		console.log("match", data);
		sendToQueue(
			"matching_queue",
			JSON.stringify({
				condition,
				difficulty,
				user,
				videoSocket,
				socketId: socket.id,
			})
		);
		socket.on("leaveQueue", (data) => {
			console.log("leaveQueue", data);
			const { condition, socket } = data;
			sendToQueue("leave_queue", JSON.stringify({ condition, socket }));
		});
	});
});

server.listen(process.env.PORT, () => {
	console.log(`listening on PORT ${process.env.PORT}`);
});

exports.io = io;
