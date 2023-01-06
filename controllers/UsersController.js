const userModel = require("../models/User.model");
const enviarMail = require("../tools/mails");
const { loggerDeclaration, downloadPicAndSaveInAvatars } = require("../tools/utils");
const logger = loggerDeclaration();

const existUser = async (email) => {
  return await userModel.findOne({ email: email });
};

const createUser = async (userToCreate) => {
  try {
   /*  if ((await existUser(userToCreate.email)) != null) {
      return false;
    } else {
      const newUser = new userModel(userToCreate);
      newUser.save();
      const text = (
        "Nuevo usuario creado: nombre: " +
        newUser.name +
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
      enviarMail(Config.EMAILADMIN,"nuevo registro", text) */
      //ENVIAR FOTO A PUBLIC AVATAR
      //downloadPic(newUser.photo, `${newUser.name} ${new Date()}`)
      downloadPicAndSaveInAvatars(userToCreate.photo, `${userToCreate.email}.jpg`)
      return true;
    /* } */
  } catch (error) {
    logger.warn("No se pudo crear el usuario" ,error);
    return false;
  }
};

module.exports = { createUser, existUser };
