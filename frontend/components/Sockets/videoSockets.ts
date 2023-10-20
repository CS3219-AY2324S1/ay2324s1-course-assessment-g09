import { io } from "socket.io-client";

const socket = io("http://localhost:5000/", { autoConnect: false });

function connectSocket() {
  socket.connect();
}

function disconnectSocket() {
  socket.disconnect();
}

function subscribeToEvent(eventName, callback) {
  socket.on(eventName, callback);
}

function emitEvent(eventName, data) {
  socket.emit(eventName, data);
}

export { connectSocket, disconnectSocket, subscribeToEvent, emitEvent, socket };
