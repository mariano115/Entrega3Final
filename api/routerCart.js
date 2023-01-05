const express = require("express");
const router = express.Router();
const { createHash, loggerDeclaration } = require("../tools/utils");
const { getProducts, addProduct } = require("../controllers/ProductsController");
const { addProductToCart } = require("../controllers/CartController");
const logger = loggerDeclaration();

router.get("/", async (req, res) => {
	/* const products = await getProducts()
	res.send(products) */
})

router.get("/:id", async (req, res) => {
	/* const product = await productsController.getProductById(req.params.id)
	res.send(product) */
})

router.post("/", async (req, res) => {
	try {
		if(await addProductToCart(req.body.idProducto, req.body.idCarrito, req.body.cantidad)){
			logger.info('se pudo agregar el producto al carrito')
			res.send("El producto fue agregado correctamente")
		}else{
			res.send('No se pudo agregar el producto al carrito').status(500)
		}
	} catch (error) {
		logger.warn(error)
		res.send('No se pudo agregar el producto al carrito').status(500)
	}
})

router.delete("/:id", /* validateAdmin, */ async (req, res) => {
	/* const product = await productsController.deleteProductById(req.params.id)
	res.send(product) */
})

router.put("/:id", /* validateAdmin, */ async (req, res) => {
        /* let newproduct = await productsController.updateProduct(req.params.id, req.body)
        res.send(newproduct) */
})

module.exports = router;