import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";
import { deleteFile } from "../../../../utils/file";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository,
    @inject("StorageProvider") private storageProvider: IStorageProvider
  ) {}

  async execute(data: IRequest) {
    const user = await this.usersRepository.findById(data.userId);

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, "avatar");
    }

    await this.storageProvider.save(data.avatarFile, "avatar");

    const userUpdated = { ...user, avatar: data.avatarFile };

    await this.usersRepository.create(userUpdated);
  }
}
