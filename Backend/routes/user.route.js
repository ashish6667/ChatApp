import express from "express";
import User from "../models/user.model.js"; // Adjust path as needed

const router = express.Router();

// Debugging middleware
router.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  next();
});

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

router.get("/allusers", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Don't expose passwords
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

export default router;
