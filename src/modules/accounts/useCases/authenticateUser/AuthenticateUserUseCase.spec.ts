import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user = {
      name: "Test name",
      email: "test@email.com",
      password: "1234",
      driver_license: "02222",
    };

    await createUserUseCase.execute(user);

    const sessionUser = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(sessionUser).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "fake@user.com",
        password: "fake",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect password", async () => {
    const user = {
      name: "Test name",
      email: "test@email.com",
      password: "1234",
      driver_license: "02222",
    };

    expect(async () => {
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "password_incorrect",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect email", async () => {
    const user = {
      name: "Test name",
      email: "test@email.com",
      password: "1234",
      driver_license: "02222",
    };

    expect(async () => {
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: "email@incorrect.com",
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
