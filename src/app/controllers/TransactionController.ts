import { Request, Response } from "express";

const TransactionService = require("../services/TransactionService");
const isValidUUID = require("../../utils/isValidUUID");

class TransactionController {
  async index(request: Request, response: Response) {
    const { user_id } = request.params;
    const { card_id } = request.query;

    const transactions = await TransactionService.findAll({
      user_id,
      card_id,
    });

    response.status(200).json(transactions);
  }

  async store(request: Request, response: Response) {
    const { card_id } = request.params;
    const { name, value, transaction_date } = request.body;

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
    const { transaction_id } = request.query;
    const { name, transaction_date } = request.body;

    if (!isValidUUID(transaction_id)) {
      return response.status(400).json({ error: "id da transação invalido" });
    }

    const transaction = await TransactionService.update({
      transaction_id,
      name,
      transaction_date,
    });

    return response.status(200).json(transaction);
  }

  async delete(request: Request, response: Response) {
    const { transaction_id } = request.params;

    if (!isValidUUID(transaction_id)) {
      return response.status(400).json({ error: "id da transação invalido" });
    }

    await TransactionService.delete({ transaction_id });

    return response.sendStatus(204);
  }
}

module.exports = new TransactionController();
