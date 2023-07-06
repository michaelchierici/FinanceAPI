import { Request, Response } from "express";

const CardService = require("../services/CardService");

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
}

module.exports = new CardController();
