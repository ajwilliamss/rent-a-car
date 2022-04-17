const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 5000;

// Create express application
const app = express();

// Connect to MongoDB
connectDB();

// Invoke Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/cars", require("./routes/carRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

// Serve client
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

// Invoke error handler middleware
app.use(errorHandler);

// Start server on port
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
