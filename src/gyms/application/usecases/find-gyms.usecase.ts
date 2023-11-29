import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { IGym } from 'src/gyms/domain/entities/gym.entity';
import { GymsService } from 'src/gyms/gyms.service';
import { GYMResponseDTO } from '../dto/response/gym-response.dto';

@Injectable()
export class FindGymsUseCase {
  constructor(
    private readonly gymsService: GymsService,
    private readonly dataServices: DatabaseServicesContract,
  ) {}

  async run(): Promise<GYMResponseDTO[]> {
    const foundGyms: IGym[] = await this.dataServices.gyms.find({});
    return foundGyms.map(
      (gym) =>
        new GYMResponseDTO({
          ...this.gymsService.serializeGym(gym),
        }),
    );
  }
}
