import { Request, Response } from "express";
const UserService = require("../services/UserService");
const isValidUUID = require("../../utils/isValidUUID");

class UserController {
  async index(request: Request, response: Response) {
    const users = await UserService.findAll();
    response.status(200).json(users);
  }

  async findOne(request: Request, response: Response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(404).json({ error: "id de usuário invalido" });
    }

    const user = await UserService.findById({ id });

    if (!user) {
      return response.status(404).json({ error: "Usuário não encontrado" });
    }

    response.json(user);
  }

  async store(request: Request, response: Response) {
    const { name, job, age } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Campo Nome é obritagório" });
    }

    if (!job) {
      return response
        .status(400)
        .json({ error: "Campo Emprego é obritagório" });
    }

    if (!age) {
      return response.status(400).json({ error: "Campo Idade é obritagório" });
    }

    const user = await UserService.create({ name, job, age });

    response.json(user);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, age, job, cards } = request.body;

    if (!isValidUUID(id)) {
      return response.status(404).json({ error: "id de usuário invalido" });
    }

    const userHasEnoughCards = await UserService.findById({ id });

    if (cards && userHasEnoughCards.cards.length >= 3) {
      return response
        .status(404)
        .json({ error: "Usuário possui o limite máximo de cartões" });
    }

    const user = await UserService.update({ id, name, age, job, cards });

    return response.status(200).json(user);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(404).json({ error: "id de usuário invalido" });
    }

    await UserService.delete({ id });

    response.sendStatus(204);
  }
}

module.exports = new UserController();
