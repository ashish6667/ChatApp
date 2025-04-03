import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();

// Enable CORS for Express
app.use(cors({
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

const server = http.createServer(app);

// Enable CORS for Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Store online users
const users = {};

// Function to get receiver's socket ID
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

// Listen for socket connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
    console.log("Online Users:", users);
  }

  // Send updated online users list to all clients
  io.emit("getOnlineUsers", Object.keys(users));

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    if (userId) {
      delete users[userId];
    }
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

// Export Express and Socket.IO
export { app, io, server };
