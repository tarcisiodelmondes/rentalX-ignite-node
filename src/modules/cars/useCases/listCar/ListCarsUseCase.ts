import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "../../repositories/ICarsRepository";

@injectable()
export class ListCarsUseCase {
  constructor(
    @inject("CarsRepository") private carsRepository: ICarsRepository
  ) {}

  async execute() {
    const cars = await this.carsRepository.findAvailable();

    return cars;
  }
}
