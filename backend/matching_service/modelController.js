const roomModel = require("./model").roomModel;

async function createRoom(socketID, difficulty) {
  await roomModel.create({ socketID: socketID, difficulty: difficulty });
}

async function checkRoom(socket, difficulty) {
  const rooms = await roomModel.findAll({
    where: { difficulty: difficulty },
  });
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

exports.checkRoom = checkRoom;
