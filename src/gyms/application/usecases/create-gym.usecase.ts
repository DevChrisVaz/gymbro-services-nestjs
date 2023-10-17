import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { Gym } from 'src/gyms/domain/entities/gym.entity';
import { GymsService } from 'src/gyms/gyms.service';
import { CreateGymDto } from '../dto/create-gym.dto';

@Injectable()
export class CreateGymUseCase {
  constructor(
    private readonly gymsService: GymsService,
    private dataServices: DatabaseServicesContract,
  ) {}

  async run(createGymDto: CreateGymDto): Promise<Gym> {
    const gym = this.gymsService.mapDtoToGym(createGymDto);
    const createdGym: Gym = await this.dataServices.gyms.save(gym);
    return this.gymsService.serializeGym(createdGym);
  }
}
