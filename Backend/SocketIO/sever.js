import http from "http";
import { Server } from "socket.io";

let io;

export const getReceiverSocketId = (receiverId) => users[receiverId];

const users = {};

export const initSocket = (app) => {
  const server = http.createServer(app);

  io = new Server(server, {
    cors: {
      origin: "https://chat-app-frontend-mu-teal.vercel.app",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    const userId = socket.handshake.query.userId;
    if (userId) {
      users[userId] = socket.id;
      console.log("Online Users:", users);
    }

    io.emit("getOnlineUsers", Object.keys(users));

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      if (userId) delete users[userId];
      io.emit("getOnlineUsers", Object.keys(users));
    });
  });

  return server;
};

export { io };
