import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCarsUseCase } from "./ListCarsUseCase";

export class ListCarsController {
  async handle(_req: Request, res: Response) {
    const listCarsUseCase = container.resolve(ListCarsUseCase);

    const cars = await listCarsUseCase.execute();

    res.json(cars);
  }
}
