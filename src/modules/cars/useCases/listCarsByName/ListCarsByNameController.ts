import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCarsByNameUseCase } from "./ListCarsByNameUseCase";

export class ListCarsByNameController {
  async handle(req: Request, res: Response) {
    const { name } = req.params;

    const listCarsByNameUseCase = container.resolve(ListCarsByNameUseCase);

    const cars = await listCarsByNameUseCase.execute({
      name,
    });

    res.json(cars);
  }
}
