const amqp = require("amqplib/callback_api");

const sendToQueue = (queueName, msg) => {
	amqp.connect("amqp://localhost", (err, conn) => {
		if (err) {
			throw err;
		}
		conn.createChannel((err, ch) => {
			if (err) {
				throw err;
			}
			ch.assertQueue(queueName, { durable: false });
			ch.sendToQueue(queueName, Buffer.from(msg));
			setTimeout(() => {
				conn.close();
			}, 1000);
		});
	});
};

exports.sendToQueue = sendToQueue;
