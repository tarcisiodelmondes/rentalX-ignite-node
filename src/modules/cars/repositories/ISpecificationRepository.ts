import { Specification } from "../entities/Specification";

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationRepository {
  findByName(name: string): Specification;
  create({ description, name }: ICreateSpecificationDTO): void;
}
