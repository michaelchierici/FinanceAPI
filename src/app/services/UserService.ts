import { UserProps } from "../../types/UserInterface";
import { AppDataSource } from "../../utils/data-source";
import { User } from "../entity/User";

class UserService {
  async findAll() {
    const usersRepository = AppDataSource.getRepository(User);

    const users = await usersRepository.find();

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
}

module.exports = new UserService();
