import { Router } from "express";

import { CreateRentalController } from "../../../../modules/rentals/useCases/createRentals/CreateRentalController";
import { DevolutionRentalController } from "../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "../../../../modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const rentalsRouter = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRouter.post("/", ensureAuthenticated, createRentalController.handle);
rentalsRouter.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handle
);
rentalsRouter.get(
  "/user",
  ensureAuthenticated,
  listRentalsByUserController.handle
);
