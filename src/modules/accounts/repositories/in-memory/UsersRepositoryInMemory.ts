import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create(data: ICreateUserDTO): Promise<void> {
    const newUser = new User();

    Object.assign(newUser, {
      email: data.email,
      driver_license: data.driver_license,
      password: data.password,
      name: data.name,
    });

    this.users.push(newUser);
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }
  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}
