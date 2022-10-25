import { inject, injectable } from "tsyringe";

import { UserMapper } from "../../mapper/UserMapper";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export class ProfileUseUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id);

    return UserMapper.toDTO(user);
  }
}
