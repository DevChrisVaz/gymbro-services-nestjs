import { Injectable } from "@nestjs/common";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";
import { UpdateGymDto } from "src/gyms/domain/dto/update-gym.dto";
import { IGym } from "src/gyms/domain/entities/gym.entity";
import { GymNotFoundException } from "src/gyms/domain/exceptions/gym-not-found.exception";
import { GymsService } from "src/gyms/gyms.service";

@Injectable()
export class UpdateGymUseCase {
    constructor(
        private  readonly gymsService: GymsService,
        private dataServices: DatabaseServicesContract
    ) {}

    async run(uuid: string, updateGymDto: UpdateGymDto): Promise<IGym> {
        const foundGym: IGym = await this.dataServices.gyms.findOne({ uuid });
        if (foundGym) {
            const dataToUpdate = this.gymsService.mapDtoToGym(updateGymDto);
            const updatedGym = await this.dataServices.gyms.update(foundGym.uuid, dataToUpdate);
            return this.gymsService.serializeGym(updatedGym);
        }
        throw new GymNotFoundException();
    }
}