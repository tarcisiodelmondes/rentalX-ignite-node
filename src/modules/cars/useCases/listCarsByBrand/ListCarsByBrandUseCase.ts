import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
  brand: string;
}

@injectable()
export class ListCarsByBrandUseCase {
  constructor(
    @inject("CarsRepository") private carsRepository: ICarsRepository
  ) {}

  async execute({ brand }: IRequest) {
    const cars = await this.carsRepository.findAvailableByBrand(brand);

    return cars;
  }
}
