import { Injectable } from "@nestjs/common";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";
import { CreateGymDto } from "src/gyms/domain/dto/create-gym.dto";
import { Gym } from "src/gyms/domain/entities/gym.entity";
import { GymsService } from "src/gyms/gyms.service";

@Injectable()
export class CreateGymUseCase {
    constructor(
        private readonly gymsService: GymsService,
        private dataServices: DatabaseServicesContract
    ) {}

    async run(createGymDto: CreateGymDto): Promise<Gym> {
        const gym = this.gymsService.mapDtoToGym(createGymDto);
        const createdGym: Gym = await this.dataServices.gyms.save(gym);
        return this.gymsService.serializeGym(createdGym);
    }
}