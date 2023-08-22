import { Injectable } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data-services.abstract";
import { User } from "src/users/domain/entities/User";
import { IUserRepository } from "src/users/domain/repositories/IUserRepository";

@Injectable()
export class FindUsersUseCase {
    constructor(
        private dataServices: IDataServices
    ) {}

    async run(): Promise<User[]> {
        const users: User[] = await this.dataServices.users.find();
        return users;
    }
}