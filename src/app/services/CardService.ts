import { Card } from "../entity/Card";
import { User } from "../entity/User";
import { AppDataSource } from "../../utils/data-source";
import { CardProps } from "../../types/Card";

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

  async addCards({ cards, id }: User) {
    const cardRepository = AppDataSource.getRepository(Card);
  }
}

module.exports = new CardService();
