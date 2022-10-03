import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "../../../errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    throw new AppError("Token missing");
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub: userId } = verify(
      token,
      "52df013c2ff2a01f8a06e285653dc126"
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User does not exists", 401);
    }

    req.user = { id: userId };

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}
