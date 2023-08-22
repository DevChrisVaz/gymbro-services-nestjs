import { Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IDataServices } from "src/core/abstracts/data-services.abstract";

@Injectable()
export class UpdateUserUseCase {
    constructor(
        private dataServices: IDataServices
    ) {}

    async run(id:string, user: User): Promise<User> {
        const foundUser: User = await this.dataServices.users.findOne(id);
        if (foundUser) {
            const updatedUser: User = await this.dataServices.users.update(id, user);
            return updatedUser;
        }
        throw new Error();
    }
}