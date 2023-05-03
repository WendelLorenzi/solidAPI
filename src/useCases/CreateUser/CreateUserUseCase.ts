import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvidet";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { CreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider,
    ) {}
    async execute(
        data: CreateUserRequestDTO
    ) {
        const userAlreadExists = await this.usersRepository.findByEmail(data.email);
        if (userAlreadExists) {
            throw new Error('User alread exists');
        }
        const user = new User(data);
        
        await this.usersRepository.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email,
            },
            from: {
                name: 'Squad BAT',
                email: 'TI@batcavernacp.com',
            },
            subject: 'Seja bem-vindo a plataforma',
            body: '<p> Voce ja pode fazer login em nossa plataforma.</p>'
        });
    }
}