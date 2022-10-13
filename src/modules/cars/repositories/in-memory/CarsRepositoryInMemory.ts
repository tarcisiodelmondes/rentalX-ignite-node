import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications,
    id,
  }: ICreateCarDTO) {
    const newCar = new Car();

    Object.assign(newCar, {
      id,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications: specifications ?? [],
    });

    this.cars.push(newCar);

    return newCar;
  }

  async findByLicensePlate(license_plate: string) {
    const car = this.cars.find((car) => car.license_plate === license_plate);

    return car;
  }

  async findAvailable() {
    const cars = this.cars.filter((car) => car.available === true);

    return cars;
  }

  async findAvailableByName(name: string) {
    const cars = this.cars.filter((car) => car.name === name);

    return cars;
  }

  async findAvailableByBrand(brand: string) {
    const cars = this.cars.filter((car) => car.brand === brand);

    return cars;
  }

  async findAvailableByCategoryId(categoryId: string) {
    const cars = this.cars.filter((car) => car.category_id === categoryId);

    return cars;
  }

  async findById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    return car;
  }
}
