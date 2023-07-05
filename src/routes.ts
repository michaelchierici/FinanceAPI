const UserController = require("./app/controllers/UserController");

const { Router } = require("express");

const router = Router();

router.get("/users", UserController.index);

router.post("/users", UserController.store);

module.exports = router;
