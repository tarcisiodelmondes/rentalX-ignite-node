import "reflect-metadata";
import "express-async-errors";
import "./database/index";
import "./shared/container";

import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import { errors } from "./middlewares/errors";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);
app.use((err: Error, req: Request, res: Response, next: NextFunction) =>
  errors(err, req, res, next)
);

app.listen(3333, () => {
  console.log("Server is running in http://localhost:3333");
});
