const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { checkRoom } = require("./modelController");

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
  socket.join(socket.id);
  console.log("a user connected:", socket.id);
  socket.on("match", (data) => {
    checkRoom(socket, data, io);
  });
  io.on("matched", (data) => {
    console.log("matched");
    io.emit("matched", data);
  });
});

server.listen(6927, () => {
  console.log("listening on PORT 6927");
});
