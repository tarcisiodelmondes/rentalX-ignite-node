import { Repository } from "typeorm";

import { AppDataSource } from "../../../../../shared/infra/typeorm";
import { ICreateRentalDTO } from "../../../dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = AppDataSource.getRepository(Rental);
  }

  async create(data: ICreateRentalDTO) {
    const newRental = this.repository.create({
      car_id: data.car_id,
      user_id: data.user_id,
      expected_return_date: data.expected_return_date,
    });

    const rentalCreated = await this.repository.save(newRental);

    return rentalCreated;
  }

  async findOpenRentalByCar(car_id: string) {
    const rental = await this.repository.findOne({ where: { car_id } });

    return rental;
  }

  async findOpenRentalByUser(user_id: string) {
    const rental = await this.repository.findOne({ where: { user_id } });

    return rental;
  }
}
