import { Specification } from "../../infra/typeorm/entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "../ISpecificationRepository";

export class SpecificationsRepositoryInMemory
  implements ISpecificationRepository
{
  specifications: Specification[] = [];

  async findByName(name: string) {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }
  async create({ description, name }) {
    const newSpecification = new Specification();

    Object.assign(newSpecification, { description, name });

    this.specifications.push(newSpecification);
  }

  async findByIds(ids: string[]) {
    const specifications = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );

    return specifications;
  }
}
