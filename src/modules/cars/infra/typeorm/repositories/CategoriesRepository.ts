import { Repository } from "typeorm";

import { AppError } from "../../../../../shared/errors/AppError";
import { AppDataSource } from "../../../../../shared/infra/typeorm";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../../../repositories/ICategoriesRepository";
import { Category } from "../entities/Category";

export class CategoriesRepository implements ICategoriesRepository {
  private repositories: Repository<Category>;

  constructor() {
    this.repositories = AppDataSource.getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO) {
    if (!name && !description) {
      throw new AppError("Invalid data!");
    }

    const newCategory = this.repositories.create({ name, description });

    await this.repositories.save(newCategory);
  }

  async list() {
    const allCategories = await this.repositories.find();
    return allCategories;
  }

  async findByName(name: string) {
    const category = await this.repositories.findOne({ where: { name } });
    return category;
  }
}
