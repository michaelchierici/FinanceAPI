import { Request, Response } from "express";
const UserService = require("../services/UserService");

class UserController {
  async index(request: Request, response: Response) {
    const users = await UserService.findAll();
    response.status(200).json(users);
  }

  async store(request: Request, response: Response) {
    const { name, job, age } = request.body;
    const user = await UserService.create({ name, job, age });

    response.json(user);
  }
}

module.exports = new UserController();
