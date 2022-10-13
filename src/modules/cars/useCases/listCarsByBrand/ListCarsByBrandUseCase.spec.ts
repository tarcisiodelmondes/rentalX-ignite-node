import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsByBrandUseCase } from "./ListCarsByBrandUseCase";

let listCarsByBrandUseCase: ListCarsByBrandUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars by brand", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsByBrandUseCase = new ListCarsByBrandUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars by brand", async () => {
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

    const cars = await listCarsByBrandUseCase.execute({ brand: car.brand });

    expect(cars).toEqual([car]);
  });
});
