const sendAllRooms = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.rooms));
};
const sendFreeRooms = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.rooms));
};
const sendRoomById = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.room));
};
const sendRoomCreated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.room));
};
const sendRoomDeleted = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.room));
};
const sendRoomUpdated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.room));
};
module.exports = {
  sendAllRooms,
  sendFreeRooms,
  sendRoomById,
  sendRoomCreated,
  sendRoomDeleted,
  sendRoomUpdated,
};
