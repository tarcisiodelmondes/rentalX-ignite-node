import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../repositories/ICarsRepository";

export interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject("CarsRepository") private carsRepository: ICarsRepository
  ) {}

  async execute(data: IRequest) {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      data.license_plate
    );

    if (carAlreadyExists) {
      throw new AppError("Car already exists");
    }

    const newCar = await this.carsRepository.create(data);

    return newCar;
  }
}
