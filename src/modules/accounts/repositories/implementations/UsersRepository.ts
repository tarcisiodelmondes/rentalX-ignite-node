import { Repository } from "typeorm";

import { AppDataSource } from "../../../../database";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({
    driver_license,
    email,
    name,
    password,
    id,
    avatar,
  }: ICreateUserDTO) {
    const newUser = this.repository.create({
      driver_license,
      email,
      name,
      password,
      id,
      avatar,
    });

    await this.repository.save(newUser);
  }

  async findByEmail(email: string) {
    const user = await this.repository.findOne({ where: { email } });

    return user;
  }

  async findById(id: string) {
    const user = await this.repository.findOne({ where: { id } });

    return user;
  }
}
