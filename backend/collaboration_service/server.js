const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());
const fs = require("fs");
let jsonData;

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
  socket.on("joinRoom", (room) => {
    socket.join(room);
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

server.listen(8080, () => {
  console.log("listening on PORT 8080");
});
