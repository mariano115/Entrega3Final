const userModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const winston = require("winston");
const fs = require("fs");
const axios = require("axios");
const Config = require("../config");

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
    res.send("Deberas loguearte primero para acceder");
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

const getDataUser = async (email) => {
  return await userModel.findOne({ email });
};

const downloadPicAndSaveInAvatars = (url, image_path) => {
  try {
    axios({
      url,
      responseType: "stream",
    }).then(
      (response) =>
        new Promise((resolve, reject) => {
          response.data
            .pipe(
              fs.createWriteStream(Config.publicAvatarsUrl + image_path)
            )
            .on("finish", () => resolve())
            .on("error", (e) => reject(e));
        })
    );
  } catch (error) {
    return false;
  }
};

const validateAdmin = (req, res, next) => {
  if (req.query?.admin == 'true') {
    next();
  } else {
    res.send({error:-1, description:`route ${req.protocol}://${req.get('host')}${req.originalUrl} method ${req.method} not authorized`, })
  }
}

module.exports = {
  auth,
  isValidPassword,
  createHash,
  loggerDeclaration,
  getDataUser,
  downloadPicAndSaveInAvatars,
  validateAdmin
};
