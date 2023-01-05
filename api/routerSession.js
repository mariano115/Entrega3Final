const express = require("express");
const router = express.Router();
const { createHash, loggerDeclaration, getDataUser } = require("../tools/utils");
const { createUser } = require("../controllers/UsersController");
const { getCartById, generatePurchaseSummary } = require("../controllers/CartController");
const enviarMail = require("../tools/mails");
const Config = require("../config");
const logger = loggerDeclaration()

router.post("/register", (req, res) => {
  logger.info("Peticion POST a ruta '/register'");
  
  try {
    const hashPassword = createHash(req.body.password);
    const newUser = {
        email: req.body.email,
        password: hashPassword,
        name: req.body.name,
        address: req.body.address,
        age: req.body.age,
        phone: req.body.phone,
        photo: req.body.photo,
      };
    if (createUser(newUser)) {
      res.send('Usuario Creado');
    } else {
      res.send("No se pudo crear el usuario");
    }
  } catch (error) {
    res.send("Hubo un problema al crear el usuario");
  }
});

router.post("/logout", (req, res) => {
  logger.info("Peticion POST a ruta '/logout'")
  console.log('req.query ', req.query);
  /* req.session.destroy((err) => {
    if (err) {
      return res.json({ success: "false", error: err });
    }
    res.render("bye", { nombre: req.query.email });
  }); */
});

router.post("/finishbuy", async (req, res) => {
  const cart = await getCartById(req.body.idCarrito)
  const user = await getDataUser(cart.email)
  const emailText = await generatePurchaseSummary(cart)
  enviarMail(Config.emailAdmin,"nuevo pedido de " + user.name + " " + user.email , emailText)
  res.send("OK")
});



module.exports = router;
