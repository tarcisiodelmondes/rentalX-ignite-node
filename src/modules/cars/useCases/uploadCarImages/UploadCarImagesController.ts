import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
  filename: string;
}

export class UploadCarImagesController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const images = req.files as IFiles[];

    const fileNames = images.map((image) => image.filename);

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    await uploadCarImagesUseCase.execute({ car_id: id, car_images: fileNames });

    res.status(201).send();
  }
}
