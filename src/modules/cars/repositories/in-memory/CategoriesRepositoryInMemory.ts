import { Category } from "../../infra/typeorm/entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    return this.categories.find((category) => category.name === name);
  }
  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const newCategory = new Category();

    Object.assign(newCategory, { name, description });

    this.categories.push(newCategory);
  }
}
