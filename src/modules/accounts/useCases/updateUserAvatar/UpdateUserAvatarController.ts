import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

export class UpdateUserAvatarController {
  async handle(req: Request, res: Response) {
    const { id } = req.user;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    const avatarFile = req.file.filename;

    await updateUserAvatarUseCase.execute({
      userId: id,
      avatarFile,
    });

    return res.status(204).send();
  }
}
