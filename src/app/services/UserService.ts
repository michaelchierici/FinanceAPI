import { CardProps } from "../../types/Card";
import { UserProps } from "../../types/User";
import { AppDataSource } from "../../utils/data-source";
import { Card } from "../entity/Card";
import { User } from "../entity/User";

class UserService {
  async findAll() {
    const usersRepository = AppDataSource.getRepository(User);

    const users = await usersRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.cards", "cards")
      .getMany();
    return users;
  }

  async create({ name, job, age }: UserProps) {
    const usersRepository = AppDataSource.getRepository(User);

    const userToBeCreated = {
      name,
      job,
      age,
    };
    const user = await usersRepository.save(userToBeCreated);
    return user;
  }

  async findById({ id }: UserProps) {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.cards", "cards")
      .where("user.id = :id", { id })
      .getOne();

    return user;
  }

  async update({ id, name, age, job, cards_ids }: UserProps) {
    const userRepository = AppDataSource.getRepository(User);
    const cardRepository = AppDataSource.getRepository(Card);

    const cardIds = cards_ids.map((card: CardProps) => card);

    const newCards = await cardRepository
      .createQueryBuilder("card")
      .where("card.id IN (:...ids)", { ids: cardIds })
      .getMany();

    const userCards = await userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.cards", "cards")
      .select(["user.id", "cards"])
      .where("user.id = :id", { id })
      .getOne();

    const mergedCards = [userCards?.cards, newCards];
    const cards: any = [...new Set(mergedCards.flat())];

    const user = await userRepository
      .createQueryBuilder()
      .update(User)
      .set({
        name,
        age,
        job,
        cards,
      })
      .where("id = :id", { id })
      .execute();

    return user;
  }
}

module.exports = new UserService();
