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
async function createUser(socketID) {
    await userModel.create({ socketID: socketID, matchStatus: false });
}
io.on("connection", (socket) => {
    console.log("a user connected:", socket.id);
    socket.on("match", async (data) => {
        if (
            await roomModel.findAll({ where: { difficulty: data.difficulty } })
        ) {
            socket.join(socket.id);
            socket.to(socket.id).emit("matched", data);
        } else {
            createUser(socket.id);
            socket.join(socket.id);
        }
    });
    socket.on("matched", (data) => {
        console.log("matched");
    });
});

server.listen(6927, () => {
    console.log("listening on PORT 6927");
});
