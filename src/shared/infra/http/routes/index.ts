import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { rentalsRouter } from "./rentals.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

export const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalsRouter);

router.use(authenticateRoutes);
