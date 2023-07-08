const { Router } = require("express");
const CardController = require("../app/controllers/CardController");

const cardRouter = Router();

cardRouter.get("/", CardController.index);

cardRouter.post("/", CardController.store);

cardRouter.patch("/:id", CardController.update);

cardRouter.delete("/:id", CardController.delete);

export { cardRouter };
