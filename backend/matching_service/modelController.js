const userModel = require("./model").userModel;
const customModel = require("./model").customModel;
const { sendToQueue } = require("./publisher");
const io = require("./socket").io;

async function createUser(difficulty, user, videoSocket, socketId) {
	const [u, created] = await userModel.findOrCreate({
		where: { socketId: socketId },
		defaults: {
			difficulty: difficulty,
			user: user,
			videoSocket: videoSocket,
			socketId: socketId,
		},
	});
	console.log(created);
}

async function pairUserByDifficulty(difficulty, user, videoSocket, socketId) {
	await createUser(difficulty, user, videoSocket, socketId);
	const users = await userModel.findAll({
		where: { difficulty: difficulty },
		order: [["createdAt", "ASC"]],
	});

	console.log("users", users);
	if (users.length >= 2) {
		const u1 = users[0].get({ plain: true });
		const u2 = users[1].get({ plain: true });
		const matchedInfo = {
			condition: "",
			difficulty: u1.difficulty,
			u1: u1.user,
			u2: u2.user,
			v1: u1.videoSocket,
			v2: u2.videoSocket,
			s1: u1.socketId,
			s2: u2.socketId,
		};
		console.log("matchedInfo", matchedInfo);
		await userModel.destroy({ where: { id: u1.id } });
		await userModel.destroy({ where: { id: u2.id } });
		console.log("Pub paired user packet to 'matched' queue")
		sendToQueue("matched_queue", JSON.stringify(matchedInfo));
	}
}

async function createCustom(
	condition,
	difficulty,
	user,
	videoSocket,
	socketId
) {
	await customModel
		.create({
			condition: condition,
			difficulty: difficulty,
			user: user,
			videoSocket: videoSocket,
			socketId: socketId,
		})
		.catch((err) => {
			io.to(socketId).emit("error", err);
		});
}
async function customPair(condition, difficulty, user, videoSocket, socketId) {
	if (difficulty != "") {
		await createCustom(condition, difficulty, user, videoSocket, socketId);
	} else {
		const users = await customModel.findAll({
			where: { condition: condition },
			order: [["createdAt", "ASC"]],
		});
		if (users.length == 1) {
			const matchedInfo = {
				condition: condition,
				difficulty: users[0].difficulty,
				u1: users[0].user,
				u2: user,
				v1: users[0].videoSocket,
				v2: videoSocket,
				s1: users[0].socketId,
				s2: socketId,
			};
			console.log("matchedInfo", matchedInfo);
			await customModel.destroy({ where: { condition: condition } });
			sendToQueue("matched_queue", JSON.stringify(matchedInfo));
		} else {
			io.to(socketId).emit("error", "Room does not exist");
		}
	}
}

async function removeFromUser(socketId) {
	await userModel.destroy({ where: { socketId: socketId } });
}

async function removeFromCustom(condition) {
	await customModel.destroy({ where: { condition: condition } });
}

exports.pairUserByDifficulty = pairUserByDifficulty;
exports.customPair = customPair;
exports.removeFromUser = removeFromUser;
exports.removeFromCustom = removeFromCustom;
