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

io.on("connection", (socket) => {
	console.log("a user connected:", socket.id);
	socket.on("joinRoom", (room) => {
		socket.join(room);
		console.log(room);
		socket.on("codeChange", (data) => {
			console.log(data);
			socket.to(room).emit("codeChange", data);
		});
		socket.on("languageChange", (data) => {
			// console.log(data);
			socket.to(room).emit("languageChange", data);
		});
	});
});

server.listen(process.env.PORT, () => {
	console.log(`listening on PORT ${process.env.PORT}`);
});
