const userModel = require("./model").userModel;
const { sendToQueue } = require("./publisher");
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

async function pairUser(difficulty, user, videoSocket, socketId) {
	// console.log(difficulty, user, videoSocket);
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
		sendToQueue("matched_queue", JSON.stringify(matchedInfo));
	}
}

exports.pairUser = pairUser;
