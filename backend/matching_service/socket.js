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
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log("a user connected:", socket.id);
	socket.on("match", (data) => {
		const { difficulty, user, videoSocket } = data;
		console.log("match", data);
		sendToQueue(
			"matching_queue",
			JSON.stringify({
				difficulty,
				user,
				videoSocket,
				socketId: socket.id,
			})
		);
	});
});

server.listen(6927, () => {
	console.log("listening on PORT 6927");
});

exports.io = io;
