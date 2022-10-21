import { hash } from "bcrypt";
import { decode } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsProvider") private dateProvider: IDateProvider
  ) {}

  async execute({ password, token }: IRequest) {
    if (!password) {
      throw new AppError("Error password is missing!");
    }

    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    );

    if (!userToken) {
      throw new AppError("Error token is invalid!");
    }

    const dateNow = this.dateProvider.dateNow();
    const isExpiredToken = this.dateProvider.compareIfBefore(
      dateNow,
      userToken.expires_date
    );

    if (!isExpiredToken) {
      await this.usersTokensRepository.deleteById(userToken.id);
      throw new AppError("Error token is expired!");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}
