import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

export interface ICarsRepository {
  create: (data: ICreateCarDTO) => Promise<Car>;
  findByLicensePlate: (license_plate: string) => Promise<Car>;
  findAvailable: () => Promise<Car[]>;
  findAvailableByName: (name: string) => Promise<Car[]>;
  findAvailableByBrand: (brand: string) => Promise<Car[]>;
  findAvailableByCategoryId: (categoryId: string) => Promise<Car[]>;
  findById: (id: string) => Promise<Car>;
  updateAvailable: (id: string, available: boolean) => Promise<void>;
}
