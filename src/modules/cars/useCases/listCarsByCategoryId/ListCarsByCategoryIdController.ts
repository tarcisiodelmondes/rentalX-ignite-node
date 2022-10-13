import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCarsByCategoryIdUseCase } from "./ListCarsByCategoryIdUseCase";

export class ListCarsByCategoryIdController {
  async handle(req: Request, res: Response) {
    const { category_id } = req.params;

    const listCarsByCategoryIdUseCase = container.resolve(
      ListCarsByCategoryIdUseCase
    );

    const cars = await listCarsByCategoryIdUseCase.execute({
      categoryId: category_id,
    });

    res.json(cars);
  }
}
