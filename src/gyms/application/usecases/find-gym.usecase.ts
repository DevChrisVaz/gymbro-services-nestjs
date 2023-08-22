import { Injectable } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data-services.abstract";
import { IGym } from "src/gyms/domain/entities/gym.entity";
import { GymNotFoundException } from "src/gyms/domain/exceptions/gym-not-found.exception";

@Injectable()
export class FindGymUseCase {
    constructor(
        private dataServices: IDataServices
    ) {}

    async run(id: string): Promise<IGym> {
        const foundGym = await this.dataServices.gyms.findOne(id);
        if (foundGym) return foundGym;
        throw new GymNotFoundException();
    }
}