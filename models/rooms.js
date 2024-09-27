const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  floor: {
    type: [Number],
    required: true,
  },
  bedCount: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
});

const rooms = mongoose.model("rooms", roomSchema);

module.exports = rooms;
