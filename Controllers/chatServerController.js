// ./controllers/chatServerController.js

// Create an empty object to store the connected users
const users = {};

// Export a function that takes in the 'io' object as a parameter
module.exports = function (io) {
  // Listen for a connection event
  io.on("connection", (socket) => {
    // Listen for a 'new-user' event
    socket.on("new-user", (name) => {
      // Store the user's name in the 'users' object using their socket id as the key
      users[socket.id] = name;
      // Broadcast a 'user-connected' event to all connected sockets except the current one
      socket.broadcast.emit("user-connected", name);
    });

    // Listen for a 'send-chat-message' event
    socket.on("send-chat-message", (message) => {
      // Broadcast a 'chat-message' event to all connected sockets
      // Include the message and the name of the user who sent it
      socket.broadcast.emit("chat-message", {
        message: message,
        name: users[socket.id],
      });
    });

    // Listen for a 'disconnect' event
    socket.on("disconnect", () => {
      // Broadcast a 'user-disconnected' event to all connected sockets
      // Include the name of the user who disconnected
      socket.broadcast.emit("user-disconnected", users[socket.id]);
      // Remove the user from the 'users' object
      delete users[socket.id];
    });
  });
};
