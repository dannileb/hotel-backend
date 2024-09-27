const sendAllRentals = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.rentals));
};
const sendRentalById = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.rental));
};
const sendRentalsByUserId = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.rentals));
};
const sendRentalCreated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.rental));
};
const sendRentalDeleted = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.rental));
};
const sendRentalUpdated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.rental));
};
module.exports = {
  sendAllRentals,
  sendRentalById,
  sendRentalsByUserId,
  sendRentalCreated,
  sendRentalDeleted,
  sendRentalUpdated,
};
