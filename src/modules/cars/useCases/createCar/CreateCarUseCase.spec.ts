import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be able to create a new car", async () => {
    const createCarSpy = jest.spyOn(createCarUseCase, "execute");

    const car = {
      brand: "DARK SHADOW TEST",
      category_id: "1d1d11rff1f3",
      daily_rate: 60,
      description: "TEST DESCRIPTION",
      fine_amount: 234,
      license_plate: "Test license",
      name: "SHADOW BLACK TEST",
    };

    const isCarCreated = await createCarUseCase.execute(car);

    expect(isCarCreated).toHaveProperty("id");
    expect(createCarSpy).toHaveBeenCalledTimes(1);
  });

  it("should not be able to create a car with exists license plate", async () => {
    const car1 = {
      brand: "DARK SHADOW TEST",
      category_id: "1d1d11rff1f3",
      daily_rate: 60,
      description: "TEST DESCRIPTION",
      fine_amount: 234,
      license_plate: "mesma_licensa",
      name: "SHADOW BLACK TEST",
    };

    const car2 = {
      brand: "TEST BRAND",
      category_id: "1d1d11rfasdasdf1f3",
      daily_rate: 60,
      description: "TEST DESCRIPTION 2",
      fine_amount: 234,
      license_plate: "mesma_licensa",
      name: "SHADOW BLACK TEST 2",
    };

    await createCarUseCase.execute(car1);

    await expect(createCarUseCase.execute(car2)).rejects.toEqual(
      new AppError("Car already exists")
    );
  });

  it("should be able to create a new car with available true by default", async () => {
    const car = {
      brand: "DARK SHADOW TEST",
      category_id: "1d1d11rff1f3",
      daily_rate: 60,
      description: "TEST DESCRIPTION",
      fine_amount: 234,
      license_plate: "Test license",
      name: "SHADOW BLACK TEST",
    };

    const carCreated = await createCarUseCase.execute(car);

    expect(carCreated.available).toBeTruthy();
  });
});
