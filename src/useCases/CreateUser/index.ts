import { MailTrapMailProvider } from "../../providers/implementations/MailTrapMailProvider";
import { PostgressUsersRepository } from "../../repositories/implementations/PostgressUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mailtrapProvider = new MailTrapMailProvider()
const postgressUsersRepository = new PostgressUsersRepository()

const createUserUseCase = new CreateUserUseCase(
    postgressUsersRepository,
    mailtrapProvider,
)

const createUserController = new CreateUserController(
    createUserUseCase
)

export {createUserUseCase, createUserController }