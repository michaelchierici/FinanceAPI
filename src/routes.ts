const UserController = require("./app/controllers/UserController");

const { Router } = require("express");

const router = Router();

router.get("/users", UserController.index);

module.exports = router;
