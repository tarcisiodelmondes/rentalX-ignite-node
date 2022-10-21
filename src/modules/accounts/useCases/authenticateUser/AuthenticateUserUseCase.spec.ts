import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let userTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dataProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dataProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dataProvider
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
    await expect(
      authenticateUserUseCase.execute({
        email: "fake@user.com",
        password: "fake",
      })
    ).rejects.toEqual(new AppError("Email or Password incorrect!"));
  });

  it("should not be able to authenticate with incorrect password", async () => {
    const user = {
      name: "Test name",
      email: "test@email.com",
      password: "1234",
      driver_license: "02222",
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "password_incorrect",
      })
    ).rejects.toEqual(new AppError("Email or Password incorrect!"));
  });

  it("should not be able to authenticate with incorrect email", async () => {
    const user = {
      name: "Test name",
      email: "test@email.com",
      password: "1234",
      driver_license: "02222",
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: "email@incorrect.com",
        password: user.password,
      })
    ).rejects.toEqual(new AppError("Email or Password incorrect!"));
  });
});
