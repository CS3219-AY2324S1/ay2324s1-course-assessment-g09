if (process.env.NODE_ENV != "production") {
	require("dotenv").config();
}

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const axios = require("axios");

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
	socket.on("joinRoom", async (room) => {
		socket.join(room);
		console.log(room);
		const res = await axios
			.get(`http://question-service:3001/questions/4`)
			.catch((err) => {
				console.log(err);
			});
		const qns = res.data.qns;
		console.log(qns);
		socket.on("getQns", () => {
			io.to(room).emit("qnsRes", qns);
		});

		socket.on("leaveRoom", () => {
			socket.leave(room);
		});

		socket.on("codeChange", (data) => {
			console.log(data);
			io.to(room).emit("codeChange", data);
		});

		socket.on("languageChange", (data) => {
			// console.log(data);
			io.to(room).emit("languageChange", data);
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
				io.to(room).emit("setTimer", { minutes: 0, seconds: 0 });
			}
		});
	});
});

server.listen(process.env.PORT, () => {
	console.log(`listening on PORT ${process.env.PORT}`);
});
