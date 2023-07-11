import { Card } from "../entity/Card";
import { Transaction } from "../entity/Transaction";

import { AppDataSource } from "../../utils/data-source";
import { TransactionProps } from "../../types/Transaction";

class TransactionService {
  async findAll({ user_id, card_id }: any) {
    const cardRepository = AppDataSource.getRepository(Card);
    const transactionRepository = AppDataSource.getRepository(Transaction);

    if (card_id) {
      const transactionsByCard = await transactionRepository.findBy({
        card: { id: card_id },
      });
      return transactionsByCard;
    }

    const allCardsTransactions = await cardRepository.findBy({
      user: { id: user_id },
    });

    return allCardsTransactions;
  }

  async create({ card_id, name, value, transaction_date }: TransactionProps) {
    const transactionRepository = AppDataSource.getRepository(Transaction);
    const cardRepository = AppDataSource.getRepository(Card);

    const newTransaction = [
      {
        name,
        value,
        transaction_date,
      },
    ];

    const transaction: Transaction[] = await transactionRepository.save(
      newTransaction
    );

    const card = await cardRepository.findOne({
      where: { id: card_id },
      select: ["transactions"],
    });

    cardRepository.merge(card!, {
      transactions: transaction,
    });

    await cardRepository.save(card!);

    return card;
  }

  async update({ id, name }: Transaction) {
    const transactionRepository = AppDataSource.getRepository(Transaction);

    const transaction = await transactionRepository.findOne({ where: { id } });

    transactionRepository.merge(transaction!, {
      name,
    });

    await transactionRepository.save(transaction!);

    return transaction;
  }

  async delete({ id }: Card) {
    const cardRepository = AppDataSource.getRepository(Card);

    const card = await cardRepository.findOne({ where: { id } });

    await cardRepository.remove(card!);
  }
}

module.exports = new TransactionService();
