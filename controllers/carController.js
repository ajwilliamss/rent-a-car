const Car = require("../models/carModel");
const asyncHandler = require("express-async-handler");

// @desc    Create car
// @route   POST /api/cars/create
// @access  Private
const createCar = asyncHandler(async (req, res) => {
  // Destructure req.body object
  const { brand, model, image, capacity, fuelType, feePerHour } = req.body;

  // If required field empty
  if (!brand || !model || !image || !capacity || !fuelType || !feePerHour) {
    res.status(400);
    throw new Error("Please add required fields");
  }

  // Create car
  const newCar = await Car.create({
    ...req.body,
    user: req.user.id,
  });

  // Respond with new car
  res.status(201).json(newCar);
});

// @desc    Get cars
// @route   GET /api/cars
// @access  Public
const getCars = asyncHandler(async (req, res) => {
  // Find all cars
  const cars = await Car.find();

  // If cars not found
  if (!cars) {
    res.status(400);
    throw new Error("No cars found");
  }

  // Respond with cars
  res.status(200).json(cars);
});

// @desc    Get car
// @route   GET /api/cars/:id
// @access  Public
const getCar = asyncHandler(async (req, res) => {
  // Find car using id params (:id)
  const car = await Car.findById(req.params.id);

  // If car not found
  if (!car) {
    res.status(400);
    throw new Error("Car not found");
  }

  // Respond with car
  res.status(200).json(car);
});

// @desc    Edit car
// @route   PUT /api/cars/:id
// @access  Private
const editCar = asyncHandler(async (req, res) => {
  // Destructure req.body object
  const { brand, model, image, capacity, fuelType, feePerHour } = req.body;

  // If required field empty
  if (!brand || !model || !image || !capacity || !fuelType || !feePerHour) {
    res.status(400);
    throw new Error("Please add required fields");
  }

  // Find car using id params (:id)
  const car = await Car.findById(req.params.id);

  // If car not found
  if (!car) {
    res.status(400);
    throw new Error("Car not found");
  }

  // If user not found
  if (!req.user) {
    res.status(400);
    throw new Error("User not found");
  }

  // If user that created car does not match logged in user
  if (car.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("You are not authorized to update this car");
  }

  // Edit car
  const editedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  // Respond with edited car
  res.status(200).json(editedCar);
});

// @desc    Delete car
// @route   DELETE /api/cars/:id
// @access  Private
const deleteCar = asyncHandler(async (req, res) => {
  // Find car using id params (:id)
  const car = await Car.findById(req.params.id);

  // If car not found
  if (!car) {
    res.status(400);
    throw new Error("Car not found");
  }

  // If user not found
  if (!req.user) {
    res.status(400);
    throw new Error("User not found");
  }

  // If user that created car does not match logged in user
  if (car.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("You are not authorized to delete this car");
  }

  // Delete car
  const deletedCar = await Car.findByIdAndDelete(req.params.id);

  // Respond with deleted car
  res.status(200).json(deletedCar);
});

module.exports = { createCar, getCars, getCar, editCar, deleteCar };
