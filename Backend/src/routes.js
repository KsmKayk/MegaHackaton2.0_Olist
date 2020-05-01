const { Router } = require("express");
const userController = require("./controllers/userController");
const mercadoLivreController = require("./controllers/mercadoLivreController");

const routes = Router();

routes.get("/mercadoLivreNotfication", mercadoLivreController.index);
routes.post("/mercadoLivreNotfication", mercadoLivreController.store);
routes.get("/users", userController.index);
routes.post("/users", userController.store);

module.exports = routes;
