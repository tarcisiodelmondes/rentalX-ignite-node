import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: `BRAND 1`,
      category_id: `category_id 1`,
      daily_rate: 60,
      description: "TEST DESCRIPTION",
      fine_amount: 234,
      license_plate: "Test license",
      name: `NAME 1`,
    });

    const cars = await listCarsUseCase.execute();

    expect(cars).toEqual([car]);
  });
});
