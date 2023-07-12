import { Request, Response } from "express";

const TransactionService = require("../services/TransactionService");
const CardService = require("../services/CardService");
const isValidUUID = require("../../utils/isValidUUID");

class TransactionController {
  async index(request: Request, response: Response) {
    const { id } = request.params;
    const { card_id } = request.query;

    const user_id = id;

    const transactions = await TransactionService.findAll({
      user_id,
      card_id,
    });

    response.status(200).json(transactions);
  }

  async store(request: Request, response: Response) {
    const { id } = request.params;
    const { name, value, transaction_date } = request.body;
    const card_id = id;

    const card = await CardService.findById({ card_id });

    if (card.limit === 0 || value > card.limit) {
      return response
        .status(400)
        .json({ erro: "Cartão não tem limite disponível" });
    }

    if (!name && !value && !transaction_date) {
      return response
        .status(400)
        .json({ error: "Compra deve ter nome, valor e data" });
    }

    const transaction = await TransactionService.create({
      card_id,
      name,
      value,
      transaction_date,
    });

    return response.json(transaction);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, transaction_date } = request.body;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: "id da transação invalido" });
    }

    const transaction = await TransactionService.update({
      id,
      name,
      transaction_date,
    });

    return response.status(200).json(transaction);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: "id da transação invalido" });
    }

    await TransactionService.delete({ id });

    return response.sendStatus(204);
  }
}

module.exports = new TransactionController();
