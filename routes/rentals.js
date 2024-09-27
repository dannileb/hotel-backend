const {
  sendAllRentals,
  sendRentalById,
  sendRentalCreated,
  sendRentalDeleted,
  sendRentalUpdated,
  sendRentalsByUserId,
} = require("../controllers/rentals");
const { checkAuth, checkAdminRules } = require("../middlewares/auth");
const {
  findAllRentals,
  findRentalById,
  createRental,
  deleteRental,
  updateRental,
  findRentalsByUserId,
} = require("../middlewares/rentals");

const rentalsRouter = require("express").Router();

rentalsRouter.get("/rentals", findAllRentals, sendAllRentals);
rentalsRouter.get("/rentals/:id", findRentalById, sendRentalById);
rentalsRouter.get(
  "/rentals/user/:id",
  checkAuth,
  findRentalsByUserId,
  sendRentalsByUserId
);
rentalsRouter.post("/rentals", createRental, sendRentalCreated);
rentalsRouter.delete(
  "/rentals/:id",
  checkAuth,
  deleteRental,
  sendRentalDeleted
);
rentalsRouter.put(
  "/rentals/:id",
  checkAuth,
  checkAdminRules,
  findRentalById,
  updateRental,
  sendRentalUpdated
);

module.exports = rentalsRouter;
