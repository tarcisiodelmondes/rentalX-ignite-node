import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "./ListCategoriesUserCase";

export class ListCategoriesController {
  async handle(_req: Request, res: Response) {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

    const allCategories = await listCategoriesUseCase.execute();

    return res.json(allCategories);
  }
}
