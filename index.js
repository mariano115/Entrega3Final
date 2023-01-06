const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require('path');
const { createUser, existUser } = require("./controllers/UsersController");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const app = express();
const httpServer = new HttpServer(app);
const cors = require("cors");
const Config = require("./config");
const cookieParser = require("cookie-parser");
const userModel = require("./models/User.model");
const MongoStore = require("connect-mongo");
const { isValidPassword, loggerDeclaration, auth, getDataUser } = require("./tools/utils");
const parseArgs = require("minimist");
const routerSession = require("./api/routerSession")
const routerProduct = require("./api/routerProduct")
const routerCart = require("./api/routerCart")

//loggers
const logger = loggerDeclaration()

//passport imports
const passport = require("passport");
const { Strategy } = require("passport-local");
const { getProducts } = require("./controllers/ProductsController");
const { createEmptyCart } = require("./controllers/CartController");
const LocalStrategy = Strategy;

//servidor
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());

/*----------- Session -----------*/
app.use(cookieParser("secreto"));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: Config.urlMongo,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: Config.secretSession,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
);

/*------------Routers-----------*/
app.use("/session", routerSession)
app.use("/productos", routerProduct)
app.use("/carrito", routerCart)


//Puerto enviado por ARGS
const args = parseArgs(process.argv.slice(2), {default: {PORT: '9090'}})
const PORT = process.env.PORT || args.PORT || 9090;

mongoose.connect(
  Config.urlMongo,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (err) throw new Error(`Error de conexión a la base de datos ${err}`);
    logger.info("Base de datos conectada");
  }
);

//middlewares passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "login",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    (email, password, done) => {
      mongoose.connect(Config.urlMongo);
      try {
        userModel.findOne(
          {
            email,
          },
          (err, user) => {
            logger.info(user);
            if (err) {
              return done(err, null);
            }

            if (!user) {
              return done(null, false);
            }

            if (!isValidPassword(user, password)) {
              return done(null, false);
            }

            return done(null, user);
          }
        );
      } catch (e) {
        return done(e, null);
      }
    }
  )
);

//serializar y deserializar

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  userModel.findById(id, function (err, user) {
    done(err, user);
  });
});

app.get("/", auth, (req, res) => {
  logger.info("Redireccion a ruta '/home' autenticacion Completada")
  res.redirect("/home");
});

app.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/login-error",
  }),
  async (req, res) => {
    logger.info("Peticion POST a ruta '/login'")
    req.session.email = req.body.email;
    res.redirect('/home')
  }
);

app.get("/home", auth, async (req, res) => {
  logger.info("Peticion GET a ruta '/home'");
  const logedUser = await getDataUser(req.session.email);
  const response = {
    products: await getProducts(),
    cart: await createEmptyCart(logedUser.email, logedUser.address),
    user: logedUser,
  };
  res.send(response);
});

app.post("/logout", (req, res) => {
  logger.info("Peticion POST a ruta '/logout'")
  req.session.destroy((err) => {
    if (err) {
      return res.json({ success: "false", error: err });
    }
    res.render("bye", { nombre: req.query.email });
  });
});

app.get("/register-error", (req, res) => {
  logger.info("Peticion GET a ruta '/register-error'")
  res.render("register-error");
});

app.get("/login-error", (req, res) => {
  logger.info("Peticion GET a ruta '/login-error'")
  res.render("login-error");
});

app.use('*',(req, res) => {
  logger.warn(`Ruta Incorrecta ${req.originalUrl}`)
  res.send(`Ruta Incorrecta ${req.originalUrl}`)
})

httpServer.listen(PORT, () =>
  logger.info("servidor Levantado en el puerto " + PORT)
);
