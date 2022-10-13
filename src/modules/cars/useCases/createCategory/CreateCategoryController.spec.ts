import { hash } from "bcrypt";
import crypto from "node:crypto";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "../../../../shared/infra/http/app";
import { AppDataSource } from "../../../../shared/infra/typeorm";

let connection: DataSource;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await AppDataSource.initialize();

    await connection.runMigrations();

    const uuid = crypto.randomUUID();
    const passwordHash = await hash("test1234", 8);

    await connection.query(
      `INSERT INTO USERS(id,name,email,password, "isAdmin", created_at, driver_license)
        values(
          '${uuid}',
          'test_user',
          'test@email.com',
          '${passwordHash}',
          true,
          'now()',
          'TTTTTTT'
        )
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "test@email.com",
      password: "test1234",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Test name",
        description: "Test description",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it("should not be able create a new category with same name", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "test@email.com",
      password: "test1234",
    });

    const { token } = responseToken.body;

    const category = {
      name: "Test name 1",
      description: "Test description 1",
    };

    await request(app)
      .post("/categories")
      .send(category)
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .post("/categories")
      .send(category)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Category already exists!");
  });
});
