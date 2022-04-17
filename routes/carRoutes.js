const express = require("express");
const router = express.Router();
const {
  createCar,
  getCars,
  getCar,
  editCar,
  deleteCar,
} = require("../controllers/carController");
const { auth } = require("../middleware/authMiddleware");

// Create car
router.post("/create", auth, createCar);
// Get cars
router.get("/", getCars);
// Get car
router.get("/:id", getCar);
// Edit car
router.put("/:id", auth, editCar);
// Delete car
router.delete("/:id", auth, deleteCar);

module.exports = router;
