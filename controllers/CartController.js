const cartModel = require("../models/Cart.model");
const { getProductById } = require("./ProductsController");
const { loggerDeclaration } = require("../tools/utils");
const logger = loggerDeclaration();

const getCarts = async () => {
    try {
      return await cartModel.find()
    } catch (error) {
      return { error: "cart not found" };
    }
}

const getCartById = async (id) => {
  try {
    console.log(await cartModel.findById(id))
    return await cartModel.findById(id);
  } catch (error) {
    return { error: "cart not found" };
  }
};

const generatePurchaseSummary = async (cart) => {
  try {
    const itemsList = cart.items
      .map((item) => {
        return `Producto: ${item.product.description} Cantidad ${item.quantity} Categoria ${item.product.category} Precio C/U ${item.product.price}
        Photo ${item.product.photo} Total: ${item.product.price * item.quantity} <br> `;
      })
      .join("");
    return itemsList;
  } catch (error) {
    logger.warn("No se pudo crear el resumen de productos");
    return error;
  }
};

const addProductToCart = async (idProduct, idCart, cantidad) => {
  try {
    const productToAdd = await getProductById(idProduct);
    const cart = await cartModel.updateOne(
      { _id: idCart },
      {
        $push: { items: { product: productToAdd, quantity: cantidad } },
      }
    );
    if (cart.modifiedCount > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    logger.warn("No se pudo agregar el producto al carrito");
    return false;
  }
};

const createEmptyCart = async (email, address) => {
  return await cartModel.create({
    email,
    date: new Date().toISOString(),
    items: [],
    address,
  });
};

module.exports = {
  getCartById,
  addProductToCart,
  createEmptyCart,
  generatePurchaseSummary,
  getCarts
};
