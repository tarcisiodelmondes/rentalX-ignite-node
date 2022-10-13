import { Router } from "express";

import { CreateRentalController } from "../../../../modules/rentals/useCases/createRentals/CreateRentalController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const rentalsRouter = Router();

const createRentalController = new CreateRentalController();

rentalsRouter.post("/", ensureAuthenticated, createRentalController.handle);
