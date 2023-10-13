import { Injectable } from "@nestjs/common";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";
import { IGym } from "src/gyms/domain/entities/gym.entity";
import { GymsService } from "src/gyms/gyms.service";

@Injectable()
export class FindGymsUseCase {
    constructor(
        private  readonly gymsService: GymsService,
        private readonly dataServices: DatabaseServicesContract
    ) {}

    async run(): Promise<IGym[]> {
        const foundGyms: IGym[] = await this.dataServices.gyms.find({});
        return foundGyms.map((gym) => this.gymsService.serializeGym(gym));
    }
}