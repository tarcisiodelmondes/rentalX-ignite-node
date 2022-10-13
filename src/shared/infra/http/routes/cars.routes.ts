import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListCarsController } from "../../../../modules/cars/useCases/listCar/ListCarsController";
import { ListCarsByBrandController } from "../../../../modules/cars/useCases/listCarsByBrand/ListCarsByBrandController";
import { ListCarsByCategoryIdController } from "../../../../modules/cars/useCases/listCarsByCategoryId/ListCarsByCategoryIdController";
import { ListCarsByNameController } from "../../../../modules/cars/useCases/listCarsByName/ListCarsByNameController";
import { UploadCarImagesController } from "../../../../modules/cars/useCases/uploadCarImages/UploadCarImagesController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const carsRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const listCarsByNameController = new ListCarsByNameController();
const listCarsByBrandController = new ListCarsByBrandController();
const listCarsByCategoryIdController = new ListCarsByCategoryIdController();

const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const uploadCarImages = multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get("/", listCarsController.handle);
carsRoutes.get("/name/:name", listCarsByNameController.handle);
carsRoutes.get("/brand/:brand", listCarsByBrandController.handle);
carsRoutes.get(
  "/category_id/:category_id",
  listCarsByCategoryIdController.handle
);

carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoutes.post(
  "/:id/images",
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImages.array("images"),
  uploadCarImagesController.handle
);
