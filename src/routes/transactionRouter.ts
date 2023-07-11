const { Router } = require("express");
const TransactionController = require("../app/controllers/TransactionController");

const transactionRouter = Router();

transactionRouter.get("/:id", TransactionController.index);

transactionRouter.post("/:id", TransactionController.store);

transactionRouter.patch("/:id", TransactionController.update);

transactionRouter.delete("/:id", TransactionController.delete);

export { transactionRouter };
