const { Schema, model } = require("mongoose");

const CartsSchema = new Schema({
	email: { type: String, required: true },
	date: { type: Date, required: true },
	items: { type: Array, required: true },
	address: { type: String, required: true }
});
module.exports = model("carritos", CartsSchema)
