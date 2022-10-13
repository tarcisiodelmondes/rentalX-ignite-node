import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsByNameUseCase } from "./ListCarsByNameUseCase";

let listCarsByNameUseCase: ListCarsByNameUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars by name", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsByNameUseCase = new ListCarsByNameUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars by name", async () => {
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

    const cars = await listCarsByNameUseCase.execute({ name: car.name });

    expect(cars).toEqual([car]);
  });
});
