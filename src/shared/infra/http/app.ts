// eslint-disable-next-line @typescript-eslint/no-var-requires
import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";
import "../typeorm/index";
import "../../container";

import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import upload from "../../../config/upload";
import swaggerFile from "../../../swagger.json";
import { errors } from "./middlewares/errors";
import { router } from "./routes";

export const app = express();

app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(router);
app.use((err: Error, req: Request, res: Response, next: NextFunction) =>
  errors(err, req, res, next)
);
