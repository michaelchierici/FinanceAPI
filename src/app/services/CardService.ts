import { Card } from "../entity/Card";
import { AppDataSource } from "../../utils/data-source";
import { CardProps } from "../../types/Card";
import { generateCardNumberBasedOnFlag } from "../../utils/cardFlag";

class CardService {
  async findAll() {
    const cardsReporsitory = AppDataSource.getRepository(Card);

    const cards = await cardsReporsitory.find({ relations: ["user"] });
    return cards;
  }

  async create({ nickname, limit, user, flag }: CardProps) {
    const cardsReporsitory = AppDataSource.getRepository(Card);

    const cardNumber = generateCardNumberBasedOnFlag[flag];

    const cardToBeCreated = {
      nickname,
      cardNumber,
      limit,
      flag,
      user,
    };

    const card = await cardsReporsitory.save(cardToBeCreated);
    return card;
  }

  async update({ id, nickname }: Card) {
    const cardRepository = AppDataSource.getRepository(Card);

    const card = await cardRepository.findOne({ where: { id } });

    cardRepository.merge(card!, {
      nickname,
    });

    await cardRepository.save(card!);

    return card;
  }

  async delete({ id }: Card) {
    const cardRepository = AppDataSource.getRepository(Card);

    const card = await cardRepository.findOne({ where: { id } });

    await cardRepository.remove(card!);
  }
}

module.exports = new CardService();
