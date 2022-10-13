import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCarsByBrandUseCase } from "./ListCarsByBrandUseCase";

export class ListCarsByBrandController {
  async handle(req: Request, res: Response) {
    const { brand } = req.params;

    const listCarsByBrandUseCase = container.resolve(ListCarsByBrandUseCase);

    const cars = await listCarsByBrandUseCase.execute({ brand });

    res.json(cars);
  }
}
