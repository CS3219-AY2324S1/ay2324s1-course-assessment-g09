const amqp = require("amqplib/callback_api");
const { pairUser } = require("./modelController");
const { io } = require("./socket");
const { v4: uuidv4 } = require("uuid");

amqp.connect("amqp://localhost", (err, conn) => {
	if (err) {
		throw err;
	}
	conn.createChannel((err, ch) => {
		if (err) {
			throw err;
		}
		let queueName = "matching_queue";
		ch.assertQueue(queueName, { durable: false });
		ch.consume(
			queueName,
			(msg) => {
				const { difficulty, user, videoSocket, socketId } = JSON.parse(
					msg.content.toString()
				);
				pairUser(difficulty, user, videoSocket, socketId);
			},
			{ noAck: true }
		);
	});

	conn.createChannel((err, ch) => {
		if (err) {
			throw err;
		}
		let queueName = "matched_queue";
		ch.assertQueue(queueName, { durable: false });
		ch.consume(
			queueName,
			(msg) => {
				const { u1, u2, v1, v2, s1, s2 } = JSON.parse(
					msg.content.toString()
				);
				console.log("matched", u1, u2, v1, v2, s1, s2);
				const roomId = uuidv4();
				io.to(s1).emit("matched", {
					user: u2,
					videoSocket: v2,
					roomId: roomId,
				});
				io.to(s2).emit("matched", {
					user: u1,
					videoSocket: v1,
					roomId: roomId,
				});
			},
			{ noAck: true }
		);
	});
});
