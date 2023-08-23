import { Injectable } from "@nestjs/common";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";
import { IGym } from "src/gyms/domain/entities/gym.entity";

@Injectable()
export class FindGymsUseCase {
    constructor(
        private dataServices: DatabaseServicesContract
    ) {}

    async run(): Promise<IGym[]> {
        const foundGyms: IGym[] = await this.dataServices.gyms.find();
        return foundGyms;
    }
}