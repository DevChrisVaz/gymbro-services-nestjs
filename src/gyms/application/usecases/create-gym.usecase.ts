import { Injectable } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data-services.abstract";
import { IGym } from "src/gyms/domain/entities/gym.entity";

@Injectable()
export class CreateGymUseCase {
    constructor(
        private dataServices: IDataServices
    ) {}

    async run(gym: IGym): Promise<IGym> {
        const createdGym = await this.dataServices.gyms.create(gym);
        return createdGym;
    }
}