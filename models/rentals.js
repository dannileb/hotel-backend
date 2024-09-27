const mongoose = require("mongoose");
const users = require("./users");
const rooms = require("./rooms");

const rentalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: users,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: rooms,
  },
  startDate: Date,
  endDate: Date,
  status: {
    type: String,
    enum: ["booked", "active", "cancelled"],
    default: "booked",
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  visitorsCount: {
    type: Number,
    required: true,
  },
});

const rentals = mongoose.model("rentals", rentalSchema);

module.exports = rentals;
