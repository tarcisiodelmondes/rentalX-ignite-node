import { Repository } from "typeorm";

import { AppDataSource } from "../../../../../shared/infra/typeorm";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

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
