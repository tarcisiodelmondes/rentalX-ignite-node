import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

import { AppDataSource } from "../../../../database";
import { Repository } from "typeorm";

export class CategoriesRepository implements ICategoriesRepository {
  private repositories: Repository<Category>;

  constructor() {
    this.repositories = AppDataSource.getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO) {
    if (!name && !description) {
      throw new Error("Invalid data!");
    }

    const newCategory = this.repositories.create({ name, description });

    await this.repositories.save(newCategory);
  }

  async list() {
    return await this.repositories.find();
  }

  async findByName(name: string) {
    const category = await this.repositories.findOne({ where: { name } });
    return category;
  }
}
