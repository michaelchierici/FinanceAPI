const UserController = require("../app/controllers/UserController");

const { Router } = require("express");

const userRouter = Router();

userRouter.get("/", UserController.index);

userRouter.post("/", UserController.store);

export { userRouter };
