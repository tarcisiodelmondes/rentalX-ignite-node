import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository") private rentalsRepository: IRentalsRepository,
    @inject("DayjsProvider") private dateProvider: IDateProvider
  ) {}

  async execute({ car_id, expected_return_date, user_id }: IRequest) {
    const minimumHourForStart = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("Error car is not available");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user");
    }

    const dateNow = dayjs().toDate();

    const daysRented = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (daysRented < minimumHourForStart) {
      throw new AppError("Error hour of return invalid");
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      expected_return_date,
      user_id,
    });

    return rental;
  }
}
