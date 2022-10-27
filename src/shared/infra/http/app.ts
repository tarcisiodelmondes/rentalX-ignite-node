// eslint-disable-next-line @typescript-eslint/no-var-requires
import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";
import "../typeorm/index";
import "../../container";

import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import upload from "../../../config/upload";
import swaggerFile from "../../../swagger.json";
import { errors } from "./middlewares/errors";
import { rateLimiter } from "./middlewares/rateLimiter";
import { router } from "./routes";

export const app = express();

app.use(rateLimiter);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(cors());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(router);

app.use(Sentry.Handlers.errorHandler());
app.use((err: Error, req: Request, res: Response, next: NextFunction) =>
  errors(err, req, res, next)
);
