import dayjs from "dayjs";

import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;
let carsRepository: CarsRepositoryInMemory;

const moreOneDay = dayjs().add(1, "day").toDate();

describe("Create Rentals", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepository = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,

      dayjsDateProvider,
      carsRepository
    );
  });

  it("should be able create a new rental", async () => {
    const rental = {
      car_id: "test",
      user_id: "test",
      expected_return_date: moreOneDay,
    };

    const newRental = await createRentalUseCase.execute(rental);

    expect(newRental).toHaveProperty("id");
    expect(newRental).toHaveProperty("start_date");
  });

  it("should not  be able to create a new rental if there is another open to the same user", async () => {
    await createRentalUseCase.execute({
      car_id: "1234",
      user_id: "user",
      expected_return_date: moreOneDay,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "test",
        user_id: "user",
        expected_return_date: moreOneDay,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user"));
  });

  it("should not  be able to create a new rental if there is another open to the same car", async () => {
    await createRentalUseCase.execute({
      car_id: "1234",
      user_id: "user",
      expected_return_date: moreOneDay,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "1234",
        user_id: "user_test",
        expected_return_date: moreOneDay,
      })
    ).rejects.toEqual(new AppError("Error car is not available"));
  });

  it("should not  be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: "1234",
        user_id: "user_test",
        expected_return_date: new Date(),
      })
    ).rejects.toEqual(new AppError("Error hour of return invalid"));
  });
});
