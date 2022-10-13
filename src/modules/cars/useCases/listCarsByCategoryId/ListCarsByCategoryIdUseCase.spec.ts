import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsByCategoryIdUseCase } from "./ListCarsByCategoryIdUseCase";

let listCarsByCategoryIdUseCase: ListCarsByCategoryIdUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars by category id", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsByCategoryIdUseCase = new ListCarsByCategoryIdUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars by category id", async () => {
    await carsRepositoryInMemory.create({
      brand: `BRAND TEST`,
      category_id: `category_id TEST`,
      daily_rate: 60,
      description: "TEST DESCRIPTION",
      fine_amount: 234,
      license_plate: "Test license",
      name: `NAME TEST`,
    });

    const car = await carsRepositoryInMemory.create({
      brand: `BRAND 1`,
      category_id: `category_id 1`,
      daily_rate: 60,
      description: "TEST DESCRIPTION",
      fine_amount: 234,
      license_plate: "Test license",
      name: `NAME 1`,
    });

    const cars = await listCarsByCategoryIdUseCase.execute({
      categoryId: car.category_id,
    });

    expect(cars).toEqual([car]);
  });
});
