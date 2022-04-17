const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const auth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    // HTTP Authorization request header
    req.headers.authorization &&
    // Bearer authentication
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Authorization denied, invalid token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Authorization denied, no token");
  }
});

module.exports = { auth };
