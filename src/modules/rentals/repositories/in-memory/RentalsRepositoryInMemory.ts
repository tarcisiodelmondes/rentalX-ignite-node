import { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

export class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async create({
    id,
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO) {
    const newRental = new Rental();

    Object.assign(newRental, {
      id,
      car_id,
      expected_return_date,
      user_id,
      start_date: new Date(),
    });

    this.rentals.push(newRental);

    return newRental;
  }

  async findOpenRentalByCar(car_id: string) {
    const rental = this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );

    return rental;
  }

  async findOpenRentalByUser(user_id: string) {
    const rental = this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );

    return rental;
  }

  async findById(id: string) {
    const rental = this.rentals.find((rental) => rental.id === id);

    return rental;
  }

  async listRentalsByUser(user_id: string) {
    return this.rentals.filter((rental) => rental.user_id === user_id);
  }
}
