import { User } from "../entity/User";
import { AppDataSource } from "../../utils/data-source";
import { UserProps } from "../../types/User";
import { Card } from "../entity/Card";
import { In, IsNull, Not } from "typeorm";
import { CardProps } from "../../types/Card";
import { isNull } from "util";

class UserService {
  async findAll() {
    const usersRepository = AppDataSource.getRepository(User);

    const users = await usersRepository.find();
    return users;
  }

  async create({ name, job, age }: User) {
    const usersRepository = AppDataSource.getRepository(User);

    const userToBeCreated = {
      name,
      job,
      age,
    };
    const user = await usersRepository.save(userToBeCreated);
    return user;
  }

  async findById({ id }: User) {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { id },
    });

    return user;
  }

  async update({ id, name, age, job, cards }: User) {
    const userRepository = AppDataSource.getRepository(User);
    const cardRepository = AppDataSource.getRepository(Card);

    let cardsTobeAdded = cards;

    async function getCardsWithNoUser() {
      const cardsIds = cards.map((card: Card) => card.id);
      const cardsWithoutUser = await cardRepository.find({
        where: { id: In(cardsIds), user: IsNull() },
      });
      return (cardsTobeAdded = cardsWithoutUser);
    }
    if (cards) {
      await getCardsWithNoUser();
    }
    const user = await userRepository.findOne({
      where: { id },
    });
    userRepository.merge(user!, {
      name,
      age,
      job,
      cards: cardsTobeAdded,
    });

    await userRepository.save(user!);

    return user;
  }

  async delete({ id }: User) {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { id } });

    await userRepository.remove(user!);

    return user;
  }
}

module.exports = new UserService();
