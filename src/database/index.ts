import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "rentx_user",
  password: "rentx_password",
  database: "rentx",
  migrations: ["./src/database/migrations/{*.js,*.ts}"],
  entities: ["./src/modules/cars/entities/{*.js,*.ts}"],
});

AppDataSource.initialize()
  .then(() => console.log("The connection to the database was successful"))
  .catch((err) => {
    throw new Error(`Database connection failed, error: ${err}`);
  });
