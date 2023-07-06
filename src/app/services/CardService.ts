import { AppDataSource } from "../../utils/data-source";
import { Card } from "../entity/Card";
import { CardProps } from "../../types/Card";
import { User } from "../entity/User";

class CardService {
  async findAll() {
    const cardsReporsitory = AppDataSource.getRepository(Card);

    const cards = await cardsReporsitory
      .createQueryBuilder("card")
      .leftJoinAndSelect("card.user", "cards")
      .getMany();
    return cards;
  }

  async create({ nickname, cardNumber, limit, user }: CardProps) {
    const cardsReporsitory = AppDataSource.getRepository(Card);

    const cardToBeCreated = {
      nickname,
      cardNumber,
      limit,
      user,
    };

    const card = await cardsReporsitory.save(cardToBeCreated);
    return card;
  }
}

module.exports = new CardService();
