import { set } from "zod";
import { get } from "http";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000/", { autoConnect: false });
let self = "";
function connectSocket() {
  socket.connect();
}

function disconnectSocket() {
  socket.disconnect();
}

function setSelf(id) {
  self = id;
}

function getSelf() {
  return self;
}

function subscribeToEvent(eventName, callback) {
  socket.on(eventName, callback);
}

function emitEvent(eventName, data) {
  socket.emit(eventName, data);
}

export {
  connectSocket,
  disconnectSocket,
  subscribeToEvent,
  emitEvent,
  socket,
  getSelf,
  setSelf,
  self,
};
