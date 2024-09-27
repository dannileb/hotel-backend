const users = require("../models/users");
const bcrypt = require("bcryptjs");

const findAllUsers = async (req, res, next) => {
  console.log(`GET /users`);
  req.usersArray = await users.find({});
  next();
};
const findUserById = async (req, res, next) => {
  console.log(`GET /users/${req.params.id}`);
  try {
    req.user = await users.findById(req.params.id);
    next();
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: `User ${req.params.id} not found by id` });
  }
};
const createUser = async (req, res, next) => {
  console.log("POST /users");
  try {
    console.log(req.body);
    req.user = await users.create(req.body);
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error while creating user" });
  }
};
const deleteUser = async (req, res, next) => {
  console.log(`DELETE /user/${req.params.id}`);
  try {
    req.user = await users.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: `Error while deleting user ${req.params.id}` });
  }
};
const updateUser = async (req, res, next) => {
  console.log(`PUT /user/${req.params.id}`);
  try {
    if (req.body.name || req.body.email || req.body.password) {
      console.log(req.body);
      req.user = await users.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      next();
    } else {
      res
        .status(400)
        .send({ message: "Error while user updating: body is empty" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: `Error while updating user ${req.params.id}` });
  }
};

const hashPassword = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Hash error" });
  }
};

module.exports = {
  findAllUsers,
  findUserById,
  createUser,
  deleteUser,
  updateUser,
  hashPassword,
};
