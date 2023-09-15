import { Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/User";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";

@Injectable()
export class CreateUserUseCase {
    constructor(
        private dataServices: DatabaseServicesContract
    ) {}

    async run(user: User): Promise<User> {
        const createdUser: User = await this.dataServices.users.save(user);
        return createdUser;
    }
}