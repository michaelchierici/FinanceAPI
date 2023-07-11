const { Router } = require("express");

import { userRouter } from "./userRouter";
import { cardRouter } from "./cardRouter";
import { transactionRouter } from "./transactionRouter";

const router = Router();

router.use("/users", userRouter);
router.use("/cards", cardRouter);
router.use("/transactions", transactionRouter);

module.exports = router;
