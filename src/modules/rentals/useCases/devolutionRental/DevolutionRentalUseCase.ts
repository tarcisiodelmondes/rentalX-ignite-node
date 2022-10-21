import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

interface IRequest {
  id: string;
}

@injectable()
export class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository") private rentalsRepository: IRentalsRepository,
    @inject("DayjsProvider") private dateProvider: IDateProvider,
    @inject("CarsRepository") private carsRepository: ICarsRepository
  ) {}

  async execute({ id }: IRequest) {
    const minimum_daily = 1;

    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError("Error rental not exists");
    }

    const car = await this.carsRepository.findById(rental.car_id);

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);

    if (daily <= 0) {
      daily = minimum_daily;
    }

    const delayOfRental = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    let totalPayable = 0;
    if (delayOfRental > 0) {
      const calculateFine = daily * car.fine_amount;
      totalPayable = calculateFine;
    }

    totalPayable += daily + car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = totalPayable;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}
