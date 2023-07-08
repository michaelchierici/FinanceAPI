const { Router } = require("express");
const UserController = require("../app/controllers/UserController");

const userRouter = Router();

userRouter.get("/", UserController.index);

userRouter.get("/:id", UserController.findOne);

userRouter.post("/", UserController.store);

userRouter.put("/:id", UserController.update);

userRouter.delete("/:id", UserController.delete);

export { userRouter };
