import { Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/User";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";
import { UsersService } from "src/users/users.service";
import { UpdateUserDto } from "src/users/domain/dto/update-user.dto";

@Injectable()
export class UpdateUserUseCase {
    constructor(
        private readonly usersService: UsersService,
        private dataServices: DatabaseServicesContract
    ) {}

    async run(id:string, updateUserDto: UpdateUserDto): Promise<User> {
        const foundUser: User = await this.dataServices.users.findOne({});
        const dataToUpdate = this.usersService.mapDtoToUser(updateUserDto);
        if (foundUser) {
            const updatedUser: User = await this.dataServices.users.update(id, dataToUpdate);
            return this.usersService.serializeUser(updatedUser);
        }
        throw new Error();
    }
}