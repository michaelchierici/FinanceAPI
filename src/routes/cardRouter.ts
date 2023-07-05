const CardController = require("../app/controllers/CardController");

const { Router } = require("express");

const cardRouter = Router();

cardRouter.get("/", CardController.index);

cardRouter.post("/", CardController.store);

export { cardRouter };
