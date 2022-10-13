import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
  categoryId: string;
}

@injectable()
export class ListCarsByCategoryIdUseCase {
  constructor(
    @inject("CarsRepository") private carsRepository: ICarsRepository
  ) {}

  async execute({ categoryId }: IRequest) {
    const cars = await this.carsRepository.findAvailableByCategoryId(
      categoryId
    );

    return cars;
  }
}
