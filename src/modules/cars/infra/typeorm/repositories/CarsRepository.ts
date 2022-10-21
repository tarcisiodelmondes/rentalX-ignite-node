import { Repository } from "typeorm";

import { AppDataSource } from "../../../../../shared/infra/typeorm";
import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../../repositories/ICarsRepository";
import { Car } from "../entities/Car";

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = AppDataSource.getRepository(Car);
  }

  async create(data: ICreateCarDTO) {
    const newCar = this.repository.create({
      id: data.id,
      name: data.name,
      description: data.description,
      brand: data.brand,
      category_id: data.category_id,
      license_plate: data.license_plate,
      daily_rate: data.daily_rate,
      fine_amount: data.fine_amount,
      specifications: data.specifications ?? [],
    });

    await this.repository.save(newCar);

    return newCar;
  }

  async findByLicensePlate(license_plate: string) {
    const car = await this.repository.findOne({ where: { license_plate } });

    return car;
  }

  async findAvailable() {
    const cars = await this.repository.find({ where: { available: true } });

    return cars.map((car) => {
      return {
        ...car,
        fine_amount: Number(car.fine_amount),
        daily_rate: Number(car.daily_rate),
      };
    });
  }

  async findAvailableByBrand(brand: string) {
    const cars = await this.repository.find({ where: { brand } });
    return cars.map((car) => {
      return {
        ...car,
        fine_amount: Number(car.fine_amount),
        daily_rate: Number(car.daily_rate),
      };
    });
  }

  async findAvailableByCategoryId(categoryId: string) {
    const cars = await this.repository.find({
      where: { category_id: categoryId },
    });
    return cars.map((car) => {
      return {
        ...car,
        fine_amount: Number(car.fine_amount),
        daily_rate: Number(car.daily_rate),
      };
    });
  }

  async findAvailableByName(name: string) {
    const cars = await this.repository.find({ where: { name } });
    return cars.map((car) => {
      return {
        ...car,
        fine_amount: Number(car.fine_amount),
        daily_rate: Number(car.daily_rate),
      };
    });
  }

  async findById(id: string) {
    const car = await this.repository.findOne({ where: { id } });

    return {
      ...car,
      fine_amount: Number(car.fine_amount),
      daily_rate: Number(car.daily_rate),
    };
  }

  async updateAvailable(id: string, available: boolean) {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameters({ id })
      .execute();
  }
}
