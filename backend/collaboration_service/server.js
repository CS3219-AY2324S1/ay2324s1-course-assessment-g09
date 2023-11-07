if (process.env.NODE_ENV != "production") {
	require("dotenv").config();
}

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: process.env.ORIGIN,
		methods: ["GET", "POST"],
	},
});

let timer;
let elapsedTime = 0;

function formatTime(mili) {
	const totalSeconds = Math.floor(mili / 1000);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return { minutes, seconds };
}

io.on("connection", (socket) => {
	console.log("a user connected:", socket.id);
	socket.on("joinRoom", (room) => {
		socket.join(room);
		console.log(room);

		socket.on("leaveRoom", () => {
			socket.leave(room);
		});

		socket.on("codeChange", (data) => {
			console.log(data);
			socket.to(room).emit("codeChange", data);
		});

		socket.on("languageChange", (data) => {
			// console.log(data);
			socket.to(room).emit("languageChange", data);
		});

		socket.on("startTimer", () => {
			if (!timer) {
				console.log("timer started");
				const startTime = Date.now() - elapsedTime;
				timer = setInterval(() => {
					elapsedTime = Date.now() - startTime;
					io.to(room).emit("setTimer", formatTime(Date.now() - startTime));
				}, 1000);
			} else {
				console.log("timer already started");
			}
		});

		// socket.on("resumeTimer", () => {
		// 	if (!timer) {
		// 		const startTime = Date.now() - elapsedTime;
		// 		timer = setInterval(() => {
		// 			elapsedTime = Date.now() - startTime;
		// 			io.to(room).emit("timer", formatTime(Date.now() - startTime));
		// 		}, 1000);
		// 	} else {
		// 		console.log("timer already started");
		// 	}
		// });

		socket.on("stopTimer", () => {
			if (timer) {
				clearInterval(timer);
				timer = null;
				console.log("Timer stopped");
			}
		});

		socket.on("resetTimer", () => {
			if (timer) {
				clearInterval(timer);
				timer = null;
				elapsedTime = 0;
				console.log("Timer reset");
				io.to(room).emit("setTimer", formatTime(0));
			}
		});
	});
});

server.listen(process.env.PORT, () => {
	console.log(`listening on PORT ${process.env.PORT}`);
});
