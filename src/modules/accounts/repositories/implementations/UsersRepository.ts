import { User } from "../../entities/User";
import { Repository } from "typeorm";
import { IUsersRepository } from "../IUsersRepository";
import { AppDataSource } from "../../../../database";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({
    driver_license,
    email,
    name,
    username,
    password,
  }: ICreateUserDTO) {
    const newUser = this.repository.create({
      driver_license,
      email,
      name,
      username,
      password,
    });

    await this.repository.save(newUser);
  }
}
