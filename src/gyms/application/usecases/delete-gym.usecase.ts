import { Injectable } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data-services.abstract";
import { IGym } from "src/gyms/domain/entities/gym.entity";
import { GymNotFoundException } from "src/gyms/domain/exceptions/gym-not-found.exception";

@Injectable()
export class DeleteGymUseCase {
    constructor(
        private dataServices: IDataServices
    ) {}

    async run(id: string): Promise<IGym> {
        const foundGym = await this.dataServices.gyms.findOne(id);
        if (foundGym) {
            const deletedGym = await this.dataServices.gyms.delete(id);
            return deletedGym;
        }
        throw new GymNotFoundException();
    }
}