import express from "express";
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

export default router;
