import { Injectable } from "@nestjs/common";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";
import { User } from "src/users/domain/entities/User";

@Injectable()
export class FindUsersUseCase {
    constructor(
        private dataServices: DatabaseServicesContract
    ) {}

    async run(): Promise<User[]> {
        const users: User[] = await this.dataServices.users.find({});
        return users;
    }
}