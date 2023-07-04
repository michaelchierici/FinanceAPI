import { Request, Response } from "express";
const UserService = require("../services/UserService");

class UserController {
  async index(request: Request, response: Response) {
    const users = await UserService.findAll();
    response.status(200).json(users);
  }
}

module.exports = new UserController();
