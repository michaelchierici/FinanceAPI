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

    const user = await userRepository.findOne({
      where: { id },
    });

    const newCards = cards_ids
      ? await cardRepository
          .createQueryBuilder("card")
          .where("card.id IN (:...ids)", { ids: cards_ids })
          .getMany()
      : [];

    const cards = [...new Set(newCards!.flat())];

    userRepository.merge(user!, {
      name,
      age,
      job,
      cards,
    });

    await userRepository.save(user!);

    return user;
  }

  async delete({ id }: UserProps) {
    const userRepository = AppDataSource.getRepository(User);
    const cardRepository = AppDataSource.getRepository(Card);

    const user = await userRepository.findOne({ where: { id } });

    await userRepository.softDelete(user!);

    return user;
  }
}

module.exports = new UserService();
