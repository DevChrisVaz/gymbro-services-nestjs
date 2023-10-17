import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { IGym } from 'src/gyms/domain/entities/gym.entity';
import { GymNotFoundException } from 'src/gyms/domain/exceptions/gym-not-found.exception';
import { GymsService } from 'src/gyms/gyms.service';

@Injectable()
export class FindGymUseCase {
  constructor(
    private readonly gymsService: GymsService,
    private dataServices: DatabaseServicesContract,
  ) {}

  async run(uuid: string): Promise<IGym> {
    const foundGym = await this.dataServices.gyms.findOne({ uuid });
    if (foundGym) return this.gymsService.serializeGym(foundGym);
    throw new GymNotFoundException();
  }
}
