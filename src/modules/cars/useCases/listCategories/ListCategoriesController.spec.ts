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

    const categories = [
      {
        id: crypto.randomUUID(),
        name: "category_1",
        description: "category_1",
        created_at: "2022-10-12T22:25:18.953Z",
        updated_at: "2022-10-12T22:25:18.953Z",
      },
      {
        id: crypto.randomUUID(),
        name: "category_2",
        description: "category_2",
        created_at: "2022-10-12T22:25:18.953Z",
        updated_at: "2022-10-12T22:25:18.953Z",
      },
    ];

    categories.map(async (category) => {
      await connection.query(
        `INSERT INTO CATEGORIES(id,name,description, created_at, updated_at)
          values(
            '${category.id}',
            '${category.name}',
            '${category.description}',
            '${category.created_at}',
            '${category.updated_at}'
          )
        `
      );
    });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  it("should be able to create a new category", async () => {
    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });
});
