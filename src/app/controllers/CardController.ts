import { Request, Response } from "express";

const CardService = require("../services/CardService");
const UserService = require("../services/UserService");

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

  async addCard(request: Request, response: Response) {
    const { id } = request.params;
    const { cards } = request.body;

    const user = await UserService.findById({ id });

    if (user.cards.length === 3) {
      return response
        .status(404)
        .json({ error: "Usuário já possui o limite máximo de cartões" });
    }
  }
}

module.exports = new CardController();
