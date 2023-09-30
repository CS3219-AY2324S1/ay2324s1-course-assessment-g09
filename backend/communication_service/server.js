// backend/server.js
const express = require("express");
const { ExpressPeerServer } = require("peer");

const app = express();
const server = require("http").Server(app);

const peerServer = ExpressPeerServer(server, {
  debug: true, // Enable debugging
});

// Serve the PeerJS server on /peerjs
app.use("/peerjs", peerServer);

// Start the server
server.listen(9000, () => {
  console.log("Server is running on port 9000");
});
