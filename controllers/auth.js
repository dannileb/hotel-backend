const users = require("../models/users");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { email, password } = req.body;
  users
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id, adminRules: user.adminRules },
        "hotel-app",
        {
          expiresIn: 3600,
        }
      );
      return { user, token };
    })
    .then(({ user, token }) => {
      res.status(200).send({
        _id: user._id,
        name: user.name,
        jwt: token,
      });
    })
    .catch((error) => {
      res.status(401).send({ message: error.message });
    });
};
const sendDashboardApprove = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json({ message: "Access approved!" });
};
module.exports = { login, sendDashboardApprove };
