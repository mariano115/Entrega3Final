const express = require("express");
const router = express.Router();
const { createHash, loggerDeclaration } = require("../tools/utils");
const logger = loggerDeclaration()

router.post("/register", (req, res) => {
  logger.info("Peticion POST a ruta '/register'");
  logger.info("req.body", req.body);
  res.send(req.body);
  /* try {
    const hashPassword = createHash(req.body.password);
    const newUser = { email: req.body.email, password: hashPassword };
    if (createUser(newUser)) {
      res.redirect("/");
    } else {
      res.render("register-error");
    }
  } catch (error) {
    res.render("register-error");
  } */
});



module.exports = router;
