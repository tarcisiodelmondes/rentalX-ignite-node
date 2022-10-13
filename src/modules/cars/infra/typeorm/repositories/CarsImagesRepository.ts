import { Repository } from "typeorm";

import { AppDataSource } from "../../../../../shared/infra/typeorm";
import { ICarsImagesRepository } from "../../../repositories/ICarImagesRepository";
import { CarImage } from "../entities/CarImage";

export class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = AppDataSource.getRepository(CarImage);
  }

  async create(car_id: string, image_name: string) {
    const newCarImage = this.repository.create({ car_id, image_name });

    await this.repository.save(newCarImage);

    return newCarImage;
  }
}
