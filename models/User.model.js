const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	address: { type: String, required: true },
	age: { type: Number, required: true },
	phone: { type: String, required: true },
	photo: { type: String, required: true }
});
module.exports = model("usuarios", UserSchema)
