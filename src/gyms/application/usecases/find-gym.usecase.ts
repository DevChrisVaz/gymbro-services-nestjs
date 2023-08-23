import { Injectable } from "@nestjs/common";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";
import { IGym } from "src/gyms/domain/entities/gym.entity";
import { GymNotFoundException } from "src/gyms/domain/exceptions/gym-not-found.exception";

@Injectable()
export class FindGymUseCase {
    constructor(
        private dataServices: DatabaseServicesContract
    ) {}

    async run(id: string): Promise<IGym> {
        const foundGym = await this.dataServices.gyms.findOne(id);
        if (foundGym) return foundGym;
        throw new GymNotFoundException();
    }
}