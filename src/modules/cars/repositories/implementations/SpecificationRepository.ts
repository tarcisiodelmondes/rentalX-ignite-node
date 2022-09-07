import { Specification } from "../../entities/Specification";
import { ISpecificationRepository } from "../ISpecificationRepository";

export class SpecificationRepository implements ISpecificationRepository {
  private specification: Specification[];

  // eslint-disable-next-line no-use-before-define
  private static INSTANCE: SpecificationRepository;

  private constructor() {
    this.specification = [];
  }

  public getInstance() {
    if (!SpecificationRepository.INSTANCE) {
      SpecificationRepository.INSTANCE = new SpecificationRepository();
    }

    return new SpecificationRepository();
  }

  create({ name, description }) {
    const category = new Specification();

    Object.assign(category, { name, description, created_at: new Date() });

    this.specification.push(category);
  }

  findByName(name: string) {
    const category = this.specification.find(
      (specification) => specification.name === name
    );
    return category;
  }
}
