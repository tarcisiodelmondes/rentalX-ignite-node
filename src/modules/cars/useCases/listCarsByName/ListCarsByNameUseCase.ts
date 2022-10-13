import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
  name: string;
}

@injectable()
export class ListCarsByNameUseCase {
  constructor(
    @inject("CarsRepository") private carsRepository: ICarsRepository
  ) {}

  async execute({ name }: IRequest) {
    const cars = await this.carsRepository.findAvailableByName(name);

    return cars;
  }
}
