import { Injectable } from "@nestjs/common";
import { GYMUserResponseDTO } from "../dto/response/gym-user-response.dto";
import { GymsService } from "src/gyms/gyms.service";
import { UsersService } from "src/users/users.service";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";
import { IGYMUser } from "src/gyms/domain/entities/gym-user.entity";

@Injectable()
export class FindGYMUsersUseCase {
    constructor(
        private readonly databaseServices: DatabaseServicesContract,
        private readonly gymsService: GymsService,
        private readonly usersService: UsersService,
    ) {}

    async run(gymId: string): Promise<GYMUserResponseDTO[]> {
        const foundGYMUsers: IGYMUser[] = await this.databaseServices.GYMUsers.find({ gym: gymId });
        console.log(foundGYMUsers);
        throw new Error();
    }
}