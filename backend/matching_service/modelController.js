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
		socket.join(rooms[0].socketID);
		socket.to(rooms[0].socketID).emit("matched", rooms[0].socketID);
		console.log(socket.rooms);
		await roomModel.destroy({ where: { difficulty: difficulty } });
	} else {
		console.log("room not found");
		createRoom(socket.id, difficulty);
		console.log(socket.rooms);
	}
}

exports.checkRoom = checkRoom;
