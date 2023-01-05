const express = require("express");
const router = express.Router();
const { createHash, loggerDeclaration } = require("../tools/utils");
const { getProducts, addProduct } = require("../controllers/ProductsController")
const logger = loggerDeclaration();

router.get("/", async (req, res) => {
	const products = await getProducts()
	res.send(products)
})

router.get("/:id", async (req, res) => {
	const product = await productsController.getProductById(req.params.id)
	res.send(product)
})

router.post("/", /* validateAdmin, */ async (req, res) => {
    let resultado = await addProduct(req.body)
    res.send(resultado)
})

router.delete("/:id", /* validateAdmin, */ async (req, res) => {
	const product = await productsController.deleteProductById(req.params.id)
	res.send(product)
})

router.put("/:id", /* validateAdmin, */ async (req, res) => {
        let newproduct = await productsController.updateProduct(req.params.id, req.body)
        res.send(newproduct)
})

module.exports = router;
