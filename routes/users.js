const { sendDashboardApprove } = require("../controllers/auth");
const {
  sendAllUsers,
  sendUserById,
  sendUserCreated,
  sendUserDeleted,
  sendUserUpdated,
  sendMe,
} = require("../controllers/users");
const { checkAuth, checkAdminRules } = require("../middlewares/auth");
const {
  findAllUsers,
  findUserById,
  createUser,
  deleteUser,
  updateUser,
  hashPassword,
} = require("../middlewares/users");

const usersRouter = require("express").Router();

usersRouter.get("/users", findAllUsers, sendAllUsers);
usersRouter.get("/users/:id", findUserById, sendUserById);
usersRouter.get("/me", checkAuth, sendMe);
usersRouter.get("/dashboard", checkAuth, checkAdminRules, sendDashboardApprove);
usersRouter.post("/users", hashPassword, createUser, sendUserCreated);
usersRouter.delete("/users/:id", checkAuth, deleteUser, sendUserDeleted);
usersRouter.put(
  "/users/:id",
  checkAuth,
  findUserById,
  updateUser,
  sendUserUpdated
);

module.exports = usersRouter;
