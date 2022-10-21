import { Request, Response } from "express";
import { container } from "tsyringe";

import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

export class DevolutionRentalController {
  async handle(req: Request, res: Response) {
    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

    const { id } = req.params;

    const rental = await devolutionRentalUseCase.execute({ id });

    res.status(200).json(rental);
  }
}
