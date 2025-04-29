import express from "express";
import User from "../models/user.model.js"; // Adjust path if needed
import { signup, login, logout, allUsers } from "../controller/user.controller.js"; // Make sure controller is correct

const router = express.Router();

// Signup Route
router.post("/signup", signup);

// Login Route
router.post("/login", login);

// Logout Route
router.get("/logout", logout); // Adjusted to use GET instead of POST

// All Users Route (Fetch users except the logged-in user)
router.get("/allusers", allUsers);

export default router;
