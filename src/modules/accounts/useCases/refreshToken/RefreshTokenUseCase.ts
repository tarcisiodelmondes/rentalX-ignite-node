import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsProvider") private dateProvider: IDateProvider
  ) {}

  async execute(refreshToken: string) {
    if (!refreshToken) {
      throw new AppError("Refresh Token is not provider!");
    }

    const { sub, email } = verify(
      refreshToken,
      auth.secret_refresh_token
    ) as IPayload;

    const user_id = sub;

    const userToken = await this.usersTokensRepository.findUserByIdAndToken(
      user_id,
      refreshToken
    );

    if (!userToken) {
      throw new AppError("Refresh Token does not exist!");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token,
    });

    await this.usersTokensRepository.create({
      user_id,
      expires_date: this.dateProvider.addDays(auth.expires_refresh_token_days),
      refresh_token,
    });

    const token = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });

    return { refresh_token, token };
  }
}
