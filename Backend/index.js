import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { initSocket } from "./SocketIO/server.js"; // ✅ updated

dotenv.config();

const app = express(); // ✅ moved here

// Enable CORS
app.use(
  cors({
    origin: "https://chat-app-frontend-mu-teal.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

// Debug middleware
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

// Routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);
app.get("/", (req, res) => res.send("Welcome to the server"));

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Connect DB and start server
mongoose
  .connect(URI)
  .then(() => {
    console.log("MongoDB connected");
    const server = initSocket(app); // ✅ same app used here
    server.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB error:", err));
