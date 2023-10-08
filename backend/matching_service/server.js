const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { sequelize } = require("./db");
const { roomModel, userModel } = require("./model");
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

async function createRoom(socketID, difficulty) {
  await roomModel.create({ socketID: socketID, difficulty: difficulty });
}
async function checkRoom(socket, difficulty) {
  const rooms = await roomModel.findAll({
    where: { difficulty: difficulty },
  });
  // console.log("matching room", rooms);
  if (rooms.length > 0) {
    console.log("room found");
    socket.join(socket.id);
    socket.emit("matched", rooms[0].socketID);
    await roomModel.destroy({ where: { difficulty: difficulty } });
  } else {
    console.log("room not found");
    // createUser(socket.id);
    createRoom(socket.id, difficulty);
  }
}
io.on("connection", (socket) => {
  socket.join(socket.id);
  console.log("a user connected:", socket.id);
  socket.on("match", (data) => {
    checkRoom(socket, data);
  });
  socket.on("matched", (data) => {
    console.log("matched");
    socket.emit("matched", data);
  });
});

server.listen(6927, () => {
  console.log("listening on PORT 6927");
});
