const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const asyncHandler = require("express-async-handler");

// @desc    Add booking
// @route   POST /api/bookings/add
// @access  Private
const addBooking = asyncHandler(async (req, res) => {
  // Destructure req.body object
  const { totalHours, totalAmount, transactionId, booking } = req.body;

  // If required field empty
  if (!totalHours || !totalAmount || !transactionId || !booking) {
    res.status(400);
    throw new Error("Please add required fields");
  }

  // Create booking
  const newBooking = await Booking.create({
    ...req.body,
    user: req.user.id,
  });

  // Find car using car id
  const car = await Car.findById(req.body.car);
  // Add booking to car bookings array
  car.bookings.push(req.body.booking);
  await car.save();

  // Respond with booking
  res.status(201).json(newBooking);
});

// @desc    Get bookings
// @route   GET /api/bookings
// @access  Private
const getBookings = asyncHandler(async (req, res) => {
  // Find all bookings of user & add associated car documents
  const bookings = await Booking.find({ user: req.user.id }).populate("car");

  // If bookings not found
  if (!bookings) {
    res.status(400);
    throw new Error("No bookings found");
  }

  // Respond with bookings
  res.status(200).json(bookings);
});

// @desc    Cancel booking
// @route   DELETE /api/bookings/:id
// @access  Private
const cancelBooking = asyncHandler(async (req, res) => {
  // Find booking using id params (:id)
  const booking = await Booking.findById(req.params.id);

  // If booking not found
  if (!booking) {
    res.status(400);
    throw new Error("Booking not found");
  }

  // If user not found
  if (!req.user) {
    res.status(400);
    throw new Error("User not found");
  }

  // If user that created booking does not match logged in user
  if (booking.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("You are not authorized to cancel this booking");
  }

  // Find car using car id
  const car = await Car.findById(booking.car);
  // Remove booking from car bookings array
  car.bookings = car.bookings.filter(
    (item) => item.from !== booking.booking.from
  );
  await car.save();

  // Delete booking
  const deletedBooking = await Booking.findByIdAndDelete(req.params.id);

  // Respond with deleted booking
  res.status(200).json(deletedBooking);
});

module.exports = { addBooking, getBookings, cancelBooking };
