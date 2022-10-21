import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UsersTokens";

export interface IUsersTokensRepository {
  create: ({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO) => Promise<UserTokens>;
  findUserByIdAndToken: (id: string, token: string) => Promise<UserTokens>;
  deleteById: (id: string) => Promise<void>;
  findByRefreshToken: (token: string) => Promise<UserTokens>;
}
