const { Schema, model } = require("mongoose");

const ProductsSchema = new Schema({
	description: { type: String, required: true },
	price: { type: Number, required: true },
	category: { type: String, required: true },
	photo: { type: String, required: true }
});
module.exports = model("productos", ProductsSchema)
