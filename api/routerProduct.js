const express = require("express");
const router = express.Router();
const { auth, validateAdmin } = require("../tools/utils");
const { getProducts, addProduct, getProductById } = require("../controllers/ProductsController")

router.get("/", auth, async (req, res) => {
	const products = await getProducts()
	res.send(products)
})

router.get("/:id", auth, async (req, res) => {
	let resultado = await getProductById(req.params.id)
	res.send(resultado)
})

router.post("/", auth, validateAdmin, async (req, res) => {
    let resultado = await addProduct(req.body)
    res.send(resultado)
})

router.delete("/:id", auth, validateAdmin, async (req, res) => {
})

router.put("/:id", auth, validateAdmin, async (req, res) => {
})

module.exports = router;
