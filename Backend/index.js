import express from "express";
import User from "./models/user.model.js";  // Correct path here
import secureRoute from "./middleware/secureRoute.js"; // ✅ This seems fine

const router = express.Router();

// ✅ Authenticated route
router.get("/allusers", secureRoute, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Exclude current user and password field
    const users = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

export default router;
