import { Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/User";
import { IDataServices } from "src/core/abstracts/data-services.abstract";

@Injectable()
export class DeleteUserUseCase {
    constructor(
        private dataServices: IDataServices
    ) {}

    async run(id: string): Promise<User> {
        const foundUser: User = await this.dataServices.users.findOne(id);
        return foundUser;
    }
}