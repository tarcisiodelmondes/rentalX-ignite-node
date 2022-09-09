import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({ name, description }: IRequest) {
    const SpecificationAlreadyExists =
      await this.specificationRepository.findByName(name);

    if (SpecificationAlreadyExists) {
      throw new Error("Specification already exists!");
    }

    await this.specificationRepository.create({ name, description });
  }
}
