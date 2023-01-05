const productsModel = require("../models/Products.model");

const getProducts = async () => {
  return await productsModel.find();
};

const getProductById = async (id) => {
  try {
    return await productsModel.findById(id);
  } catch (error) {
    return { error: "product not found" };
  }
};

const addProduct = (product) => {
  if (
    product.description !== undefined &&
    product.description.trim() !== "" &&
    product.description !== null &&
    product.price !== undefined &&
    product.price !== "" &&
    product.price !== null &&
    product.category !== undefined &&
    product.category.trim() !== "" &&
    product.category !== null &&
    product.photo !== undefined &&
    product.photo.trim() !== "" &&
    product.photo !== null
  ) {
    productsModel.create(product);
  } else {
    return { error: "Valores incorrectos" };
  }
};

const deleteProductById = async (id) => {
  try {
    return await productsModel.deleteOne({ id });
  } catch (error) {
    return { error: "product not found" };
  }
};

const updateProduct = (id, product) => {};

module.exports = { getProducts, addProduct, getProductById };