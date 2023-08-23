import { Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/User";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";

@Injectable()
export class FindUserUseCase {
    constructor(
        private dataServices: DatabaseServicesContract
    ) {}

    async run(id: string): Promise<User> {
        const foundUser: User = await this.dataServices.users.findOne(id);
        return foundUser;
    }
}