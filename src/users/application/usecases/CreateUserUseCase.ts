import { Injectable } from "@nestjs/common";
import { SerializedUser, User } from "../../domain/entities/User";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";
import { CreateUserDto } from "src/users/domain/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import { DataHashingContract } from "src/encryption/domain/contracts/hashing.contract";

@Injectable()
export class CreateUserUseCase {
    constructor(
        private usersService: UsersService,
        private readonly hashingService: DataHashingContract,
        private dataServices: DatabaseServicesContract
    ) {}

    async run(createUserDTO: CreateUserDto): Promise<User> {
        const user = this.usersService.mapDtoToUser(createUserDTO);
        user.password = await this.hashingService.hash(user.password);
        const createdUser: User = await this.dataServices.users.save(user);
        return new SerializedUser(createdUser);
    }
}