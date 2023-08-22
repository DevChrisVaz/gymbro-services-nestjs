import { Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IDataServices } from "src/core/abstracts/data-services.abstract";

@Injectable()
export class CreateUserUseCase {
    constructor(
        private dataServices: IDataServices
    ) {}

    async run(user: User): Promise<User> {
        const createdUser: User = await this.dataServices.users.create(user);
        return createdUser;
    }
}