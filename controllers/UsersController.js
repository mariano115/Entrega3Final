const userModel = require("../models/User.model");
const enviarMail = require("../tools/mails");
const { loggerDeclaration } = require("../tools/utils");
const logger = loggerDeclaration();

const existUser = async (email) => {
  return await userModel.findOne({ email: email });
};

const createUser = async (userToCreate) => {
  try {
    if ((await existUser(userToCreate.email)) != null) {
      return false;
    } else {
      const newUser = new userModel(userToCreate);
      newUser.save();
      const text = (
        "Nuevo usuario creado: nombre: " +
        newUser.email +
        " email: " +
        newUser.email +
        " address: " +
        newUser.address +
        " age: " +
        newUser.age +
        " phone " +
        newUser.phone +
        " photo " +
        newUser.photo)
      enviarMail(Config.EMAILADMIN,"nuevo registro", text)
      return true;
    }
  } catch (error) {
    logger.warn("No se pudo crear el usuario" ,error);
  }
};

module.exports = { createUser, existUser };
