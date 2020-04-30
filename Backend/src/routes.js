const { Router } = require("express");
const authController = require("./controllers/authController");
const userController = require("./controllers/userController");
const mercadoLivreController = require("./controllers/mercadoLivreController");

const routes = Router();

routes.get("/mercadoLivreNotfication", mercadoLivreController.index);
routes.get("/users", userController.index);
routes.get("/auth", authController.index);
routes.post("/auth", authController.store);

module.exports = routes;
