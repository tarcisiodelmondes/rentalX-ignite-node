import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "../../repositories/in-memory/SpecificationsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "DARK SHADOW TEST",
      category_id: "1d1d11rff1f3",
      daily_rate: 60,
      description: "TEST DESCRIPTION",
      fine_amount: 234,
      license_plate: "Test license",
      name: "SHADOW BLACK TEST",
    });

    const specification1 = {
      name: "test_1",
      description: "test_d_1",
    };

    const specification2 = {
      name: "test_2",
      description: "test_d_2",
    };

    await specificationsRepositoryInMemory.create(specification1);
    await specificationsRepositoryInMemory.create(specification2);

    const specification_id = await specificationsRepositoryInMemory.findByName(
      specification1.name
    );

    const specificationsId = [specification_id.id];

    const carWithSpecificationCreated =
      await createCarSpecificationUseCase.execute({
        car_id: car.id,
        specifications_id: specificationsId,
      });

    expect(carWithSpecificationCreated.specifications).toContainEqual(
      specification_id
    );
  });

  it("should be not able to add a new specification to a now-exists car", async () => {
    const car_id = "1234124";
    const specifications_id = ["1432423"];

    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      })
    ).rejects.toEqual(new AppError("Error car not exists"));
  });
});
