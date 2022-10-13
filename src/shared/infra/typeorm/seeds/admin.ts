import { hash } from "bcrypt";
import crypto from "node:crypto";
import { DataSource } from "typeorm";

import { AppDataSource } from "..";

async function create() {
  const uuid = crypto.randomUUID();
  const passwordHash = await hash("admin1234", 8);

  let connection: DataSource;

  if (!AppDataSource.isInitialized) {
    connection = await AppDataSource.initialize();
  }

  connection = AppDataSource;

  await connection.query(
    `INSERT INTO USERS(id,name,email,password, "isAdmin", created_at, driver_license)
      values(
        '${uuid}',
        'admin_user',
        'admin@email.com',
        '${passwordHash}',
        true,
        'now()',
        'TTTTTTT'
      )
    `
  );

  await connection.destroy();
}

create().then(() => console.log("User admin created!"));
