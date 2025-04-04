import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/sever.js";

dotenv.config();

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
app.options("*", cors());

// Debugging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  next();
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
app.use("/api/user", userRoute); // Ensure this is correct
app.use("/api/message", messageRoute);
app.use("/", (req, res) => {
  res.send("Welcome to the server");
});

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    // Add your signup logic here
    res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    console.error("Error in signup route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use("/api/auth", router);

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
