import { Request, Response } from "express";
import { container } from "tsyringe";

import { ProfileUseUseCase } from "./ProfileUserUseCase";

export class ProfileUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.user;

    const profileUserUseCase = container.resolve(ProfileUseUseCase);

    const profileUser = await profileUserUseCase.execute(id);

    return res.json(profileUser);
  }
}
