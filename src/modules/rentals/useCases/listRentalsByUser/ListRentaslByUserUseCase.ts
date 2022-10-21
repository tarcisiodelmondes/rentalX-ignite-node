import { inject, injectable } from "tsyringe";

import { IRentalsRepository } from "../../repositories/IRentalsRepository";

interface IRequest {
  user_id: string;
}

@injectable()
export class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository") private rentalsRepository: IRentalsRepository
  ) {}

  async execute({ user_id }: IRequest) {
    const rentals = await this.rentalsRepository.listRentalsByUser(user_id);

    return rentals;
  }
}
