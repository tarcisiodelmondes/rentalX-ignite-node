import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsProvider") private dateProvider: IDateProvider
  ) {}

  async execute(data: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(data.email);

    if (!user) {
      throw new AppError("Email or Password incorrect!");
    }

    const passwordMatch = await compare(data.password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or Password incorrect!");
    }

    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token,
    });

    const refresh_token = sign(
      { email: data.email },
      auth.secret_refresh_token,
      {
        subject: user.id,
        expiresIn: auth.expires_in_refresh_token,
      }
    );

    await this.usersTokensRepository.create({
      user_id: user.id,
      expires_date: this.dateProvider.addDays(auth.expires_refresh_token_days),
      refresh_token,
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refresh_token,
    };
  }
}
