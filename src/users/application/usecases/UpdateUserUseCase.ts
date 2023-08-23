import { Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/User";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";

@Injectable()
export class UpdateUserUseCase {
    constructor(
        private dataServices: DatabaseServicesContract
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