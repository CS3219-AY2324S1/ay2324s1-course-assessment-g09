const amqp = require("amqplib/callback_api");
const {
	pairUserByDifficulty,
	customPair,
	removeFromCustom,
	removeFromUser,
} = require("./modelController");
const { io } = require("./socket");
const { v4: uuidv4 } = require("uuid");

amqp.connect(process.env.RABBITMQ, (err, conn) => {
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
				const { condition, difficulty, user, videoSocket, socketId } =
					JSON.parse(msg.content.toString());
				console.log("Consuming user", user, "packet from 'matching' queue.")
				if (condition == "") {
					pairUserByDifficulty(difficulty, user, videoSocket, socketId);
				} else {
					customPair(condition, difficulty, user, videoSocket, socketId);
				}
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
				console.log("Consuming paired user packet from 'matched' queue.")
				const { condition, difficulty, u1, u2, v1, v2, s1, s2 } = JSON.parse(
					msg.content.toString()
				);
				console.log("Paired User", u1, "and User", u2,"\nVideo Socket for User", u1, ":", v1, "\nVideo Socket for User", u2, ":", v2,"\nWeb Socket for User", u1, ":", s1, "\nWeb Socket for User", u2, ":", s2);
				let roomId = uuidv4().toString();
				if (condition != "") {
					roomId = condition;
				}
				io.to(s1).emit("matched", {
					difficulty: difficulty,
					user: u2,
					videoSocket: v2,
					roomId: roomId,
				});
				io.to(s2).emit("matched", {
					difficulty: difficulty,
					user: u1,
					videoSocket: v1,
					roomId: roomId,
				});
			},
			{ noAck: true }
		);

		conn.createChannel((err, ch) => {
			let queueName = "leave_queue";
			ch.assertQueue(queueName, { durable: false });
			ch.consume(
				queueName,
				(msg) => {
					console.log("Consuming message from 'leave' queue.")
					const { condition, socketId } = JSON.parse(msg.content.toString());
					console.log(condition, socketId);
					if (condition == "") {
						removeFromUser(socketId);
					} else {
						removeFromCustom(condition);
					}
				},
				{ noAck: true }
			);
		});
	});
});
