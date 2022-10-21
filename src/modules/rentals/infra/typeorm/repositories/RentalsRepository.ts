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
      id: data.id,
      car_id: data.car_id,
      user_id: data.user_id,
      expected_return_date: data.expected_return_date,
      end_date: data.end_date,
      total: data.total,
    });

    const rentalCreated = await this.repository.save(newRental);

    return rentalCreated;
  }

  async findOpenRentalByCar(car_id: string) {
    const rental = await this.repository.query(
      `SELECT * FROM rentals WHERE car_id='${car_id}' AND end_date IS null FETCH FIRST ROWS ONLY`
    );

    if (rental.length <= 0) {
      return undefined;
    }

    return rental[0];
  }

  async findOpenRentalByUser(user_id: string) {
    const rental = await this.repository.query(
      `SELECT * FROM rentals WHERE user_id='${user_id}' AND end_date IS null FETCH FIRST ROWS ONLY`
    );

    if (rental.length <= 0) {
      return undefined;
    }

    return rental[0];
  }

  async findById(id: string) {
    const rental = await this.repository.findOne({ where: { id } });

    return rental;
  }

  async listRentalsByUser(id: string) {
    const rentals = await this.repository.find({
      where: { user_id: id },
      relations: ["car"],
    });

    return rentals;
  }
}
