import { AppDataSource } from "../../utils/data-source";
import { Card } from "../entity/Card";
import { CardProps } from "../../types/Card";

class CardService {
  async findAll() {
    const cardsReporsitory = AppDataSource.getRepository(Card);

    const cards = await cardsReporsitory.find();
    return cards;
  }

  async create({ nickname, cardNumber, limit }: CardProps) {
    const cardsReporsitory = AppDataSource.getRepository(Card);

    const cardToBeCreated = {
      nickname,
      cardNumber,
      limit,
    };

    const card = await cardsReporsitory.save(cardToBeCreated);
    return card;
  }
}

module.exports = new CardService();
