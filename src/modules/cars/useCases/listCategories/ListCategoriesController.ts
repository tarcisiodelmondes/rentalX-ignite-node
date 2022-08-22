import { Request, Response } from "express";

import { ListCategoriesUseCase } from "./ListCategoriesUserCase";

export class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  handle(_req: Request, res: Response) {
    const allCategories = this.listCategoriesUseCase.execute();

    return res.json(allCategories);
  }
}
