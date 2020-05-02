const { Router } = require("express");
const userController = require("./controllers/userController");
const questionController = require("./controllers/questionController");
const answerController = require("./controllers/answerController");
//const mercadoLivreController = require("./controllers/mercadoLivreController");

const routes = Router();

//routes.get("/mercadoLivreNotfication", mercadoLivreController.index);
//routes.post("/mercadoLivreNotfication", mercadoLivreController.store);
routes.get("/allQuestions", questionController.index);
routes.get("/answers", answerController.index);
routes.post("/answers", answerController.store);
routes.get("/users", userController.index);
routes.post("/users", userController.store);

module.exports = routes;
