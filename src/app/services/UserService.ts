import { User } from "../entity/User";
import { AppDataSource } from "../../utils/data-source";
import { UserProps } from "../../types/User";

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

    const user = await userRepository.findOne({
      where: { id },
    });

    return user;
  }

  async update({ id, name, age, job }: User) {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { id },
    });

    userRepository.merge(user!, {
      name,
      age,
      job,
    });

    await userRepository.save(user!);
    return user;
  }

  async delete({ id }: UserProps) {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { id } });

    await userRepository.softRemove(user!);

    return user;
  }
}

module.exports = new UserService();
