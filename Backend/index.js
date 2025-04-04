import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/sever.js";

dotenv.config();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://chat-app-frontend-mu-teal.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Enable CORS
app.use(
  cors({
    origin: "https://chat-app-frontend-mu-teal.vercel.app", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Explicitly allow headers
    credentials: true, // Allow cookies and credentials
  })
);

// Handle Preflight Requests
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://chat-app-frontend-mu-teal.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

// Middleware
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose
  .connect(URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error));

// Routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);
app.use("/", (req, res) => {
  res.send("Welcome to the server");
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
