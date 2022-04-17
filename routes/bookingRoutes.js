const express = require("express");
const router = express.Router();
const {
  addBooking,
  getBookings,
  cancelBooking,
} = require("../controllers/bookingController");
const { auth } = require("../middleware/authMiddleware");

// Add booking
router.post("/add", auth, addBooking);
// Get bookings
router.get("/", auth, getBookings);
// Cancel booking
router.delete("/:id", auth, cancelBooking);

module.exports = router;
