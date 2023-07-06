const UserController = require("../app/controllers/UserController");

const { Router } = require("express");

const userRouter = Router();

userRouter.get("/", UserController.index);

userRouter.get("/:id", UserController.findOne);

userRouter.post("/", UserController.store);

userRouter.patch("/:id", UserController.update);

export { userRouter };
