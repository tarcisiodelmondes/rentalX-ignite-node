import { resolve } from "node:path";
import { DataSource } from "typeorm";

import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database:
    process.env.NODE_ENV === "test" ? process.env.DATABASE_NAME : "rentx",
  migrations: [resolve(__dirname, "migrations", "{*.js,*.ts}")],
  entities: [
    resolve(
      __dirname,
      "..",
      "..",
      "..",
      "modules",
      "*",
      "infra",
      "typeorm",
      "entities",
      "{*.js,*.ts}"
    ),
  ],
});

AppDataSource.initialize()
  .then(() => console.log("The connection to the database was successful"))
  .catch((err) => {
    throw new Error(`Database connection failed, error: ${err}`);
  });
