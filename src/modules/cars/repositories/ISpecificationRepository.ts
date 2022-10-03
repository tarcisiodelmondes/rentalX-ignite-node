import { Specification } from "../infra/typeorm/entities/Specification";

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationRepository {
  findByName(name: string): Promise<Specification>;
  create({ description, name }: ICreateSpecificationDTO): Promise<void>;
}
