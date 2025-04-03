import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/sever.js";


dotenv.config();
// middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors());

const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;

try {
  mongoose.connect(URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log(error);
}
//routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);
app.use("/", (req,res)=>{
  res.send("Welcome to the server")
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
