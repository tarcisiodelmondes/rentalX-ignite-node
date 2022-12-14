import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

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
      throw new AppError("Specification already exists!");
    }

    await this.specificationRepository.create({ name, description });
  }
}
