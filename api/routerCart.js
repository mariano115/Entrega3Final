const express = require("express");
const router = express.Router();
const { loggerDeclaration, auth, validateAdmin } = require("../tools/utils");
const { addProductToCart, getCarts, getCartById } = require("../controllers/CartController");
const logger = loggerDeclaration();

router.get("/", auth, validateAdmin, async (req, res) => {
	res.send(await getCarts())
})

router.get("/:id", auth, async (req, res) => {
	res.send(await getCartById(req.params.id))
})

router.post("/", auth, async (req, res) => {
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

router.delete("/:id", auth, validateAdmin, async (req, res) => {
})

router.put("/:id", auth, validateAdmin, async (req, res) => {
})

module.exports = router;