import { instanceToInstance } from "class-transformer";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";

export class UserMapper {
  static toDTO({
    avatar,
    driver_license,
    email,
    id,
    name,
    avatar_url,
  }: IUserResponseDTO) {
    const user = instanceToInstance({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url,
    });

    return user;
  }
}
