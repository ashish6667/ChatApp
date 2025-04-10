import express from "express";
import User from "../models/user.model.js"; // Adjust the path if necessary

const router = express.Router();

// ✅ Add /allusers endpoint
router.get("/allusers", async (req, res) => {
  try {
    const users = await User.find({}, "_id username"); // Retrieve users without password
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

export default router;
