const {
  sendAllRooms,
  sendRoomById,
  sendRoomCreated,
  sendRoomDeleted,
  sendRoomUpdated,
  sendFreeRooms,
} = require("../controllers/rooms");
const { checkAuth, checkAdminRules } = require("../middlewares/auth");
const {
  findAllRooms,
  findRoomById,
  createRoom,
  deleteRoom,
  updateRoom,
  findFreeRooms,
} = require("../middlewares/rooms");

const roomsRouter = require("express").Router();

roomsRouter.get("/rooms", findAllRooms, sendAllRooms);
roomsRouter.get("/rooms/:id", findRoomById, sendRoomById);
roomsRouter.post("/rooms", checkAuth, createRoom, sendRoomCreated);
roomsRouter.post("/rooms/free", findAllRooms, findFreeRooms, sendFreeRooms);
roomsRouter.delete("/rooms/:id", checkAuth, deleteRoom, sendRoomDeleted);
roomsRouter.put("/rooms/:id", checkAuth, checkAdminRules, updateRoom, sendRoomUpdated);

module.exports = roomsRouter;
