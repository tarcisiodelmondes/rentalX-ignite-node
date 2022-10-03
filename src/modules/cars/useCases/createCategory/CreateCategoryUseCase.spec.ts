import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUserCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able create a new category", async () => {
    const categoryDataTest = {
      name: "Test name",
      description: "Test description",
    };

    await createCategoryUseCase.execute(categoryDataTest);

    const listAllCategories = await categoriesRepositoryInMemory.list();
    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      categoryDataTest.name
    );

    expect(listAllCategories.length).toEqual(1);
    expect(categoryCreated).toHaveProperty(
      "description",
      categoryDataTest.description
    );
    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able create a new category with same name", async () => {
    expect(async () => {
      const categoryDataTest = {
        name: "Test name",
        description: "Test description",
      };

      await createCategoryUseCase.execute(categoryDataTest);

      await createCategoryUseCase.execute(categoryDataTest);
    }).rejects.toBeInstanceOf(AppError);
  });
});
