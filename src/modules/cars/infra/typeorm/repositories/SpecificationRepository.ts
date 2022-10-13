import { In, Repository } from "typeorm";

import { AppDataSource } from "../../../../../shared/infra/typeorm";
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "../../../repositories/ISpecificationRepository";
import { Specification } from "../entities/Specification";

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

  async findByIds(ids: string[]) {
    const specifications = await this.repository.findBy({ id: In(ids) });

    return specifications;
  }
}
