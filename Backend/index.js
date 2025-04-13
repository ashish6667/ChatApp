import express from "express";
import User from "./models/user.model.js"; // Adjust the path if necessary

const router = express.Router();

// ✅ Add /allusers endpoint
router.get("/allusers", async (req, res) => {
  try {
    // Retrieve users without password
    const users = await User.find({}, "_id fullname email"); // Adjusted to use fullname and email
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

export default router;
