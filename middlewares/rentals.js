const rentals = require("../models/rentals");

const findAllRentals = async (req, res, next) => {
  console.log(`GET /rentals`);
  req.rentals = await rentals.find({}).populate("room").populate({
    path: "user",
    select: "-password",
  });
  next();
};
const findRentalById = async (req, res, next) => {
  console.log(`GET /rentals/${req.params.id}`);
  try {
    req.rentals = await rentals
      .findById(req.params.id)
      .populate("room")
      .populate({
        path: "user",
        select: "-password",
      });
    next();
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .send({ message: `Rental ${req.params.id} not found by id` });
  }
};
const findRentalsByUserId = async (req, res, next) => {
  console.log(`GET /rentals/user/${req.params.id}`);
  try {
    req.rentals = await rentals.find({ user: req.params.id }).populate("room");
    next();
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .send({ message: `Rental of user ${req.params.id} cannot be found` });
  }
};
const createRental = async (req, res, next) => {
  console.log("POST /rentals");
  try {
    console.log(req.body);
    req.rental = await rentals.create(req.body);
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: `Error while rental creating` });
  }
};
const deleteRental = async (req, res, next) => {
  console.log(`DELETE /rental/${req.params.id}`);
  try {
    req.rental = await rentals
      .findByIdAndDelete(req.params.id)
      .populate("room")
      .populate({
        path: "user",
        select: "-password",
      });
    next();
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: `Error while deleting rental ${req.params.id}` });
  }
};
const updateRental = async (req, res, next) => {
  console.log(`PUT /rental/${req.params.id}`);
  try {
    req.rental = await rentals
      .findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
      .populate("room")
      .populate({
        path: "user",
        select: "-password",
      });
    next();
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: `Error while updating rental ${req.params.id}` });
  }
};
module.exports = {
  findAllRentals,
  findRentalById,
  findRentalsByUserId,
  createRental,
  deleteRental,
  updateRental,
};
