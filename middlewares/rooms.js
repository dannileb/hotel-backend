const rentals = require("../models/rentals");
const rooms = require("../models/rooms");

const findAllRooms = async (req, res, next) => {
  console.log(`GET /rooms`);
  req.rooms = await rooms.find({});
  next();
};
const findFreeRooms = async (req, res, next) => {
  console.log(`GET /rooms/free`);
  const { from, to } = req.body;
  if (!from || !to) {
    return res
      .status(400)
      .send({ message: `'from' and 'to' field are required` });
  }
  try {
    const foundRentals = await rentals.find({
      startDate: { $gte: new Date(from) },
      endDate: { $lte: new Date(to) },
    });
    if (!foundRentals) {
      console.error(error);
      res.status(500).send({ message: `Error finding free rooms` });
    }
    req.rooms = req.rooms.filter((room) => {
      return !foundRentals.some((rental) => {
        return rental.room.equals(room._id);
      });
    });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Error finding free rooms` });
  }
};
const findRoomById = async (req, res, next) => {
  console.log(`GET /rooms/${req.params.id}`);
  try {
    const room = await rooms.findById(req.params.id);
    if (!room) {
      return res
        .status(404)
        .send({ message: `Room ${req.params.id} not found ` });
    }

    const rentalDates = await rentals.find({ room: room._id });

    req.room = {
      ...room._doc,
      rentalDates: rentalDates.map((rental) => ({
        from: rental.startDate,
        to: rental.endDate,
      })),
    };

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Error finding room ${req.params.id} ` });
  }
};
const createRoom = async (req, res, next) => {
  console.log("POST /rooms");
  try {
    console.log(req.body);
    req.room = await rooms.create(req.body);
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error while creating room" });
  }
};
const deleteRoom = async (req, res, next) => {
  console.log(`DELETE /rooms/${req.params.id}`);
  try {
    req.room = await rooms.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: `Error while deleting room ${req.params.id}` });
  }
};
const updateRoom = async (req, res, next) => {
  console.log(`PUT /rooms/${req.params.id}`);
  try {
    console.log(req.body);
    req.room = await rooms.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(req.room);
    next();
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: `Error while updating room ${req.params.id}` });
  }
};
module.exports = {
  findAllRooms,
  findFreeRooms,
  findRoomById,
  createRoom,
  deleteRoom,
  updateRoom,
};
