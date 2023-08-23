import { Injectable } from "@nestjs/common";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";
import { IGym } from "src/gyms/domain/entities/gym.entity";
import { GymNotFoundException } from "src/gyms/domain/exceptions/gym-not-found.exception";

@Injectable()
export class UpdateGymUseCase {
    constructor(
        private dataServices: DatabaseServicesContract
    ) {}

    async run(id: string, gym: IGym): Promise<IGym> {
        const foundGym: IGym = await this.dataServices.gyms.findOne(id);
        if (foundGym) {
            const updatedGym = await this.dataServices.gyms.update(id, gym);
            return updatedGym;
        }
        throw new GymNotFoundException();
    }
}