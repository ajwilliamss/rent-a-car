const mongoose = require("mongoose");
const { Schema } = mongoose;

const carSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    image: { type: String, required: true },
    capacity: { type: Number, required: true },
    fuelType: { type: String, required: true },
    feePerHour: { type: Number, required: true },
    bookings: [
      {
        from: { type: String, required: true },
        to: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
