import { Request, Response } from "express";

const CardService = require("../services/CardService");
const UserService = require("../services/UserService");
const isValidUUID = require("../../utils/isValidUUID");

class CardController {
  async index(request: Request, response: Response) {
    const cards = await CardService.findAll();

    response.status(200).json(cards);
  }

  async store(request: Request, response: Response) {
    const { nickname, cardNumber, limit, user_id } = request.body;
    const card = await CardService.create({
      nickname,
      cardNumber,
      limit,
      user_id,
    });

    response.json(card);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { nickname } = request.body;

    if (!isValidUUID(id)) {
      return response.status(404).json({ error: "id de cartão invalido" });
    }

    if (!nickname) {
      return response.status(404).json({ error: "Nome é obrigatório" });
    }

    const card = await CardService.update({ id, nickname });

    return response.status(200).json(card);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    if (!isValidUUID(id)) {
      return response.status(404).json({ error: "id de cartão invalido" });
    }
    await CardService.delete({ id });

    return response.sendStatus(204);
  }
}

module.exports = new CardController();
