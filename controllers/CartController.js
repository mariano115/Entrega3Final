const cartModel = require("../models/Cart.model");
const { getProductById } = require("./ProductsController");
const { loggerDeclaration } = require("../tools/utils");
const logger = loggerDeclaration();

/* const getCarts = async () => {
    const carts = await cartModel.find()
    return carts? carts: {error: "there aren't carts"}
} */

const getCartById = async (id) => {
  try {
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

/* const addCart = async () => {
    return await this.saveObject() 
} */

/* const deleteCartById = async (id) => {
    try {
        return await this.deleteById(id)
    } catch (error) {
        return { error: "cart not found" }
    }
}
const updateCart = async (id, cart) => {
    try {
        if (
            cart !== undefined
            && cart.products !== undefined
        ){
            cart._id = id
            await this.updateRow(cart)
            return cart
        }
        else{
            return { error: "the cart and products must be defined" }
        }
    } catch (error) {
        return { error: "cart not found" }
    }
} */

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
  /* getProducts, addProduct, getProductById*/ getCartById,
  addProductToCart,
  createEmptyCart,
  generatePurchaseSummary,
};
