// Translating to RabbitMQ

// import * as amqp from 'amqplib';
const amqp = require("amqplib");
const { v4: uuidv4 } = require("uuid");
MessageObjectForPairedQueue = {
	user1_ID: 0,
	user2_ID: 0,
	ack1: false,
	ack2: false,
};

const rabbitMQUrl = "amqp://localhost:5672"; // Change this URL to match your RabbitMQ server

// Function to create a RabbitMQ connection
async function createRabbitMQConnection() {
	try {
		const connection = await amqp.connect(rabbitMQUrl);
		return connection;
	} catch (error) {
		console.error("Error creating RabbitMQ connection:", error);
		// throw error;
		return null;
	}
}

// Call createConnection to establish a connection
const sharedConnection = createRabbitMQConnection();

// Define queue options
const queueOptions = {
	durable: true, // Ensure that the queue survives server restarts
	messageTtl: 30000, // Set message TTL to 30 seconds (messages expire after 30s)
};

// Define queue options
const pairedQueueOptions = {
	durable: true, // Ensure that the queue survives server restarts
	// messageTtl: 30000, // Set message TTL to 30 seconds (messages expire after 30s)
};

// Define queues for different difficulty levels
const queueNames = {
	Easy: "easy-q",
	Medium: "medium-q",
	Hard: "hard-q",
};

const pairedQueueNames = {
	Easy: "easy-pq",
	Medium: "medium-pq",
	Hard: "hard-pq",
};

// Function to insert a user ID into the queue and insert paired queue if there are more than two users
async function insertUserIdIntoQueue(difficulty, userId, videoSocket) {
	const connection = await sharedConnection; // Use the shared connection
	const channel = await connection.createChannel();
	const data = {
		userId: userId,
		videoSocket: videoSocket,
	};
	channel.assertQueue(queueNames[difficulty], queueOptions);
	channel.sendToQueue(
		queueNames[difficulty],
		Buffer.from(JSON.stringify(data))
	);

	// Then checkForPair in RabbitMQ queue
	channel.checkQueue(queueNames[difficulty]).then(async (queueInfo) => {
		const queueSize = queueInfo.messageCount;
		console.log("Queue: ", queueInfo);
		console.log("Queue size: ", queueSize);
		// If there are at least two users in the queue, process them
		if (queueSize >= 2) {
			// Create a message object that includes user pair IDs, ack1, and ack2
			const messagePairedObject = {
				user1_ID: 0,
				user2_ID: 0,
				ack1: false,
				ack2: false,
				room: uuidv4(),
			};

			// Consume the oldest two messages from the queue (FIFO) to get paired user IDs
			let messageCount = 0;

			while (messageCount < 2) {
				const message = await channel.get(queueNames[difficulty]);
				console.log("message", message);
				if (message !== false) {
					const userId = message.content.toString();
					if (messageCount == 0) {
						messagePairedObject.user1_ID = userId;
					} else if (messageCount == 1) {
						messagePairedObject.user2_ID = userId;
					}
					// console.log(messagePairedObject);

					// Acknowledge the message
					channel.ack(message);

					messageCount++;
					console.log("messge count", messageCount);
				} else {
					break; // No more messages in the queue
				}
			}

			// You now have a pair of user IDs, e.g., userPair = [userId1, userId2] + ack 1 and ack 2
			const matchedUserIDs = Buffer.from(
				JSON.stringify(messagePairedObject)
			);

			// Send the user pair IDs to the paired queue
			channel.sendToQueue(pairedQueueNames[difficulty], matchedUserIDs);

			channel.close();
		} else {
			console.log("Not enough users in queue");
		}
	});
}

// Function to check for a match in Rabbit MQ paired queue
// async function checkForMatch(difficulty, userId) {
//   const connection = await sharedConnection; // Use the shared connection
//   let matchedUser = null; // Initialize with null or any default value

//   return new Promise<number | null>((resolve) => {
//     const interval = setInterval(async () => {

//       // Connect to RabbitMQ paired queue for the selected difficulty
//       const channel = await connection.createChannel();
//       channel.assertQueue(pairedQueueNames[difficulty], pairedQueueOptions);

//       // Get pairing in paired queue
//       const message = await channel.get(pairedQueueNames[difficulty]);
//       if (message !== false) {
//         // Extract message content into a string
//         const messageContent = message.content.toString();

//         // Parse the message content into the messagePairedObject
//         const messagePairedObject = JSON.parse(messageContent);

//         // Perform further processing as needed
//         if (userId == messagePairedObject.user1_ID && !messagePairedObject.ack1) {
//           messagePairedObject.ack1 = true;
//           matchedUser = messagePairedObject.user2_ID;
//           // console.log("Current User ID: ", userId, "   Matched User ID: ", matchedUser)
//         } else if (userId == messagePairedObject.user2_ID && !messagePairedObject.ack2) {
//           messagePairedObject.ack2 = true;
//           matchedUser = messagePairedObject.user1_ID;
//           // console.log("Current User ID: ", userId, "   Matched User ID: ", matchedUser)
//         }

//         // Acknowledge and remove the original message from the queue
//         channel.ack(message);

//         const hasBothAckPairedMessage = messagePairedObject.ack1 && messagePairedObject.ack2;
//         if (!hasBothAckPairedMessage) {
//           const matchedUserIDs = Buffer.from(JSON.stringify(messagePairedObject));

//           // Send the user pair IDs to the paired queue
//           channel.sendToQueue(pairedQueueNames[difficulty], matchedUserIDs);
//         }
//       }

//       // Close the channel after processing
//       channel.close();

//       // Return matched user ID if found
//       if (matchedUser != null) {
//         clearInterval(interval);
//         resolve(matchedUser)
//       }

//       setTimeout(() => {
//         clearInterval(interval); // Stop checking after 30 seconds
//         resolve(matchedUser); // Return null if no match found
//       }, 30000);
//     }, 500); // Check every 0.5 second
//   });
// }

async function checkForMatch(difficulty, userId) {
	return new Promise(async (resolve, reject) => {
		const connection = await sharedConnection; // Use the shared connection
		let matchedUser = null; // Initialize with null or any default value
		let room = null;
		let receiverVideoSocket = null;
		const interval = setInterval(async () => {
			try {
				// Connect to RabbitMQ paired queue for the selected difficulty
				const channel = await connection.createChannel();
				channel.assertQueue(
					pairedQueueNames[difficulty],
					pairedQueueOptions
				);

				// Get pairing in the paired queue
				const message = await channel.get(pairedQueueNames[difficulty]);
				// console.log("message in check", message);
				if (message !== false) {
					// Extract message content into a string
					const messageContent = message.content.toString();
					console.log(messageContent);
					// Parse the message content into the messagePairedObject
					const messagePairedObject = JSON.parse(messageContent);
					// console.log(messagePairedObject);
					// Perform further processing as needed
					const user1_ID = JSON.parse(messagePairedObject.user1_ID);
					const user2_ID = JSON.parse(messagePairedObject.user2_ID);
					// console.log(messagePairedObject);
					if (
						userId == user1_ID.userId &&
						!messagePairedObject.ack1
					) {
						messagePairedObject.ack1 = true;
						matchedUser = user2_ID.userId;
						receiverVideoSocket = user2_ID.videoSocket;
						// console.log("Current User ID: ", userId, "   Matched User ID: ", matchedUser)
					} else if (
						userId == user2_ID.userId &&
						!messagePairedObject.ack2
					) {
						messagePairedObject.ack2 = true;
						matchedUser = user1_ID.userId;
						receiverVideoSocket = user1_ID.videoSocket;
						// console.log("Current User ID: ", userId, "   Matched User ID: ", matchedUser)
					}
					// Acknowledge and remove the original message from the queue
					room = messagePairedObject.room;
					channel.ack(message);

					const hasBothAckPairedMessage =
						messagePairedObject.ack1 && messagePairedObject.ack2;
					if (!hasBothAckPairedMessage) {
						const matchedUserIDs = Buffer.from(
							JSON.stringify(messagePairedObject)
						);

						// Send the user pair IDs to the paired queue
						channel.sendToQueue(
							pairedQueueNames[difficulty],
							matchedUserIDs
						);
					}

					// Close the channel after processing
					channel.close();

					// Return matched user ID if found
					if (matchedUser != null) {
						clearInterval(interval);
						console.log(matchedUser, room);
						resolve({ matchedUser, room, receiverVideoSocket });
					}
				}
			} catch (error) {
				clearInterval(interval);
				reject(error); // Reject the promise if there's an error
			}
		}, 500); // Check every 0.5 second

		// Add a setTimeout to resolve if no match is found within 30 seconds
		setTimeout(() => {
			clearInterval(interval); // Stop checking after 30 seconds
			resolve({ matchedUser, room, receiverVideoSocket }); // Resolve with null if no match found
		}, 30000);
	});
}

async function findMatch(req, res) {
	console.log("Hello from find match :)");
	try {
		const { difficulty, userId, videoSocket } = await req.body;
		console.log(
			"Difficulty: ",
			difficulty,
			"   User ID: ",
			userId,
			"   Video Socket: ",
			videoSocket
		);
		// Send the user ID to the corresponding queue
		await insertUserIdIntoQueue(difficulty, userId, videoSocket);

		// Check for a match
		const { matchedUser, room, receiverVideoSocket } = await checkForMatch(
			difficulty,
			userId
		);
		console.log("Matched user: ", matchedUser);
		if (matchedUser != null) {
			res.status(200).json({
				success: true,
				matchedUser,
				room,
				receiverVideoSocket,
			});
		} else {
			res.status(200).json({ success: false, message: "No match found" });
		}
	} catch (error) {
		console.error("An error occurred:", error);
		res.status(500).json({ success: false, message: "Server Exception" });
	}
}

module.exports = {
	findMatch,
};
