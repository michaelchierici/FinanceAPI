import { AppDataSource } from "../../utils/data-source";
import { User } from "../entity/User";

class UserService {
  async findAll() {
    const usersRepository = AppDataSource.getRepository(User);

    const users = await usersRepository.find();

    return users;
  }
}

module.exports = new UserService();
