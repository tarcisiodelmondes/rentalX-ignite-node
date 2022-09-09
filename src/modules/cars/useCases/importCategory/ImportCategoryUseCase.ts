import { parse } from "csv-parse";
import fs from "node:fs";

import { inject, injectable } from "tsyringe";

import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: CategoriesRepository
  ) {}

  async loadCategories(file: Express.Multer.File) {
    return new Promise<IImportCategory[]>((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => {
          fs.promises.unlink(file.path);
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File) {
    if (!file) {
      throw new Error("invalid data");
    }

    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const existsCategory = await this.categoriesRepository.findByName(
        category.name
      );

      if (!existsCategory) {
        await this.categoriesRepository.create(category);
      }
    });
  }
}
