const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { auth } = require("../middleware/authMiddleware");

// Register user
router.post("/register", registerUser);
// Login user
router.post("/login", loginUser);
// Get user
router.get("/", auth, getUser);
// Update user
router.put("/:id", auth, updateUser);
// Delete user
router.delete("/:id", auth, deleteUser);

module.exports = router;
