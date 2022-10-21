import { Repository } from "typeorm";

import { AppDataSource } from "../../../../../shared/infra/typeorm";
import { ICreateUserTokenDTO } from "../../../dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "../../../repositories/IUsersTokensRepository";
import { UserTokens } from "../entities/UsersTokens";

export class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserTokens);
  }

  async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO) {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findUserByIdAndToken(id: string, token: string) {
    return this.repository.findOne({
      where: { user_id: id, refresh_token: token },
    });
  }

  async deleteById(id: string) {
    await this.repository.delete({ id });
  }

  async findByRefreshToken(token: string) {
    return this.repository.findOne({ where: { refresh_token: token } });
  }
}
