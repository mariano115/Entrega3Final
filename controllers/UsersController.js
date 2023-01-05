const userModel = require("../models/User.model");
const enviarMail = require("../tools/mails");

const existUser = async (email) => {
  console.log(await userModel.findOne({ email: email }))
  return await userModel.findOne({ email: email });
};

const createUser = async (userToCreate) => {
  console.log("userTo create", userToCreate);
  try {
    if ((await existUser(userToCreate.email)) != null) {
      return false;
    } else {
      const newUser = new userModel(userToCreate);
      newUser.save();
      console.log("Usuario Creado", newUser);
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
    console.log("error", error);
  }
};

module.exports = { createUser, existUser };
