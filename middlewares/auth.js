const jwt = require("jsonwebtoken");
const users = require("../models/users");

const checkAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Необходима авторизация" });
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const verifiedUser = jwt.verify(token, "hotel-app");
    const gottenUser = await users.findById(verifiedUser._id);
    const user = { ...gottenUser._doc };
    req.adminRules = user.adminRules;
    delete user.password;
    delete user.adminRules;

    req.user = { user, jwt: token };
  } catch (error) {
    return res.status(401).send({ message: "Необходима авторизация" });
  }
  next();
};
const checkAdminRules = async (req, res, next) => {
  if (!req.adminRules) {
    return res.status(401).send({ message: "Необходима авторизация" });
  }
  next();
};
const checkCookiesJWT = (req, res, next) => {
  if (!req.cookies.jwt) {
    return res.redirect("/");
  }
  req.headers.authorization = `Bearer ${req.cookies.jwt}`;
  next();
};

module.exports = { checkAuth, checkAdminRules, checkCookiesJWT };
