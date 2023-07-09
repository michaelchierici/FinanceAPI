import { Request, Response } from "express";
const CardService = require("../services/CardService");
const isValidUUID = require("../../utils/isValidUUID");

class CardController {
  async index(request: Request, response: Response) {
    const cards = await CardService.findAll();

    response.status(200).json(cards);
  }

  async store(request: Request, response: Response) {
    const { nickname, limit, flag, user } = request.body;

    if (!nickname) {
      return response
        .status(404)
        .json({ error: "Nome do cartão é obritagório" });
    }

    if (!flag) {
      return response
        .status(404)
        .json({ error: "Selecione a bandeira do cartão" });
    }

    const card = await CardService.create({
      nickname,
      limit,
      flag,
      user,
    });

    response.json(card);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { nickname } = request.body;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: "id de cartão invalido" });
    }

    if (!nickname) {
      return response.status(400).json({ error: "Nome é obrigatório" });
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
