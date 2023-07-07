import { Request, Response } from "express";
const UserService = require("../services/UserService");

class UserController {
  async index(request: Request, response: Response) {
    const users = await UserService.findAll();
    response.status(200).json(users);
  }

  async findOne(request: Request, response: Response) {
    const { id } = request.params;

    const user = await UserService.findById({ id });

    response.status(200).json(user);
  }

  async store(request: Request, response: Response) {
    const { name, job, age } = request.body;
    const user = await UserService.create({ name, job, age });

    response.json(user);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, age, job, cards_ids } = request.body;

    const user = await UserService.update({ id, name, age, job, cards_ids });

    return response.status(200).json(user);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await UserService.delete({ id });

    response.status(200);
  }
}

module.exports = new UserController();
