import { Injectable } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data-services.abstract";
import { IGym } from "src/gyms/domain/entities/gym.entity";

@Injectable()
export class FindGymsUseCase {
    constructor(
        private dataServices: IDataServices
    ) {}

    async run(): Promise<IGym[]> {
        const foundGyms: IGym[] = await this.dataServices.gyms.find();
        return foundGyms;
    }
}