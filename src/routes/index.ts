const { Router } = require("express");
import { cardRouter } from "./cardRouter";
import { userRouter } from "./userRouter";

const router = Router();

router.use("/users", userRouter);
router.use("/cards", cardRouter);

module.exports = router;
