import { Card } from "../entity/Card";
import { AppDataSource } from "../../utils/data-source";

class CardService {
  async findAll() {
    const cardsReporsitory = AppDataSource.getRepository(Card);

    const cards = await cardsReporsitory
      .createQueryBuilder("card")
      .leftJoinAndSelect("card.user", "cards")
      .getMany();
    return cards;
  }

  async create({ nickname, cardNumber, limit, user }: Card) {
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

    await cardRepository.softRemove(card!);
  }
}

module.exports = new CardService();
