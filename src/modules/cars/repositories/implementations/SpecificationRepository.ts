import { Specification } from "../../entities/Specification";
import {
  ISpecificationRepository,
  ICreateSpecificationDTO,
} from "../ISpecificationRepository";

import { AppDataSource } from "../../../../database";
import { Repository } from "typeorm";

export class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO) {
    const newSpecification = this.repository.create({ name, description });

    await this.repository.save(newSpecification);
  }

  async findByName(name: string) {
    const specification = await this.repository.findOne({ where: { name } });
    return specification;
  }
}
