import { useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000/", { autoConnect: false });
// const [self, setSelf] = useState("");
function connectSocket() {
	socket.connect();
}

function disconnectSocket() {
	socket.disconnect();
}

// export function setId(id) {
// 	setSelf(id);
// }

// export function getId() {
// 	return self;
// }

function subscribeToEvent(eventName, callback) {
	socket.on(eventName, callback);
}

function emitEvent(eventName, data) {
	socket.emit(eventName, data);
}

export { connectSocket, disconnectSocket, subscribeToEvent, emitEvent, socket };
