const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const winston = require("winston");

const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

const auth = (req, res, next) => {
  if (req.session?.email) {
    next();
  } else {
    res.render("login");
  }
};

const loggerDeclaration = () => {
  return winston.createLogger({
    level: "debug",
    transports: [
      new winston.transports.Console({ level: "info" }),
      new winston.transports.File({ filename: "warn.log", level: "warn" }),
      new winston.transports.File({ filename: "error.log", level: "error" }),
    ],
  });
};

module.exports = {
  auth,
  isValidPassword,
  createHash,
  loggerDeclaration,
};
