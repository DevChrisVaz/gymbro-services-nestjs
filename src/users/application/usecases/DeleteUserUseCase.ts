import { Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/User";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";
import { UsersService } from "src/users/users.service";

@Injectable()
export class DeleteUserUseCase {
    constructor(
        private readonly usersService: UsersService,
        private dataServices: DatabaseServicesContract
    ) {}

    async run(uuid: string): Promise<User> {
        const deleted: User = await this.dataServices.users.delete(uuid);
        return this.usersService.serializeUser(deleted);
    }
}