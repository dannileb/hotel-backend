const apiRouter = require("express").Router();
const authRouter = require("./auth");
const rentalsRouter = require("./rentals");
const roomsRouter = require("./rooms");
const usersRouter = require("./users");

apiRouter.use("/api", roomsRouter);
apiRouter.use("/api", usersRouter);
apiRouter.use("/api", rentalsRouter);
apiRouter.use("/api", authRouter);

module.exports = apiRouter;
