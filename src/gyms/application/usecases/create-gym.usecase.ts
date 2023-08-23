import { Injectable } from "@nestjs/common";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";
import { IGym } from "src/gyms/domain/entities/gym.entity";

@Injectable()
export class CreateGymUseCase {
    constructor(
        private dataServices: DatabaseServicesContract
    ) {}

    async run(gym: IGym): Promise<IGym> {
        const createdGym = await this.dataServices.gyms.create(gym);
        return createdGym;
    }
}