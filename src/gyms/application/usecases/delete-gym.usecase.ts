import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { Gym } from 'src/gyms/domain/entities/gym.entity';
import { GymNotFoundException } from 'src/gyms/domain/exceptions/gym-not-found.exception';
import { GymsService } from 'src/gyms/gyms.service';

@Injectable()
export class DeleteGymUseCase {
  constructor(
    private readonly gymsService: GymsService,
    private dataServices: DatabaseServicesContract,
  ) {}

  async run(uuid: string): Promise<Gym> {
    const foundGym = await this.dataServices.gyms.findOne({ uuid });
    if (foundGym) {
      const deletedGym = await this.dataServices.gyms.delete(foundGym.uuid);
      return this.gymsService.serializeGym(deletedGym);
    }
    throw new GymNotFoundException();
  }
}
