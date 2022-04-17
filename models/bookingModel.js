const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    car: { type: Schema.Types.ObjectId, required: true, ref: "Car" },
    totalHours: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    transactionId: { type: String, required: true },
    booking: {
      from: { type: String, required: true },
      to: { type: String, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
