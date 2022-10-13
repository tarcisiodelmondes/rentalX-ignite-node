import "reflect-metadata";
import "express-async-errors";
import "../typeorm/index";
import "../../container";

import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "../../../swagger.json";
import { errors } from "./middlewares/errors";
import { router } from "./routes";

export const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);
app.use((err: Error, req: Request, res: Response, next: NextFunction) =>
  errors(err, req, res, next)
);
