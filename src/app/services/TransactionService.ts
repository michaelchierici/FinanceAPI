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

    const allCardsTransactions = await cardRepository.findOneBy({
      user: { id: user_id },
    });

    return allCardsTransactions;
  }

  async create({ card_id, name, value, transaction_date }: TransactionProps) {
    const transactionRepository = AppDataSource.getRepository(Transaction);
    const cardRepository = AppDataSource.getRepository(Card);

    const card = await cardRepository.findOne({
      where: { id: card_id },
      select: ["transactions"],
    });

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

    cardRepository.merge(card!, {
      ...card,
      limit: card?.limit! - value,
      transactions: transaction,
    });

    await cardRepository.save(card!);

    return card;
  }

  async update({ id, name, transaction_date }: Transaction) {
    const transactionRepository = AppDataSource.getRepository(Transaction);

    const transaction = await transactionRepository.findOne({ where: { id } });

    transactionRepository.merge(transaction!, {
      name,
      transaction_date,
    });

    await transactionRepository.save(transaction!);

    return transaction;
  }

  async delete({ id }: Card) {
    const transactionRepository = AppDataSource.getRepository(Transaction);

    const transaction = await transactionRepository.findOne({ where: { id } });

    await transactionRepository.remove(transaction!);
  }
}

module.exports = new TransactionService();
