import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { IGym } from 'src/gyms/domain/entities/gym.entity';
import { GymsService } from 'src/gyms/gyms.service';
import { UpdateGymDto } from '../dto/update-gym.dto';

@Injectable()
export class UpdateGymUseCase {
  constructor(
    private readonly gymsService: GymsService,
    private dataServices: DatabaseServicesContract,
  ) {}

  async run(uuid: string, updateGymDto: UpdateGymDto): Promise<IGym> {
    const foundGym: IGym = await this.dataServices.gyms.findOne({ uuid });
    const dataToUpdate = this.gymsService.mapDtoToGym(updateGymDto);
    const updatedGym = await this.dataServices.gyms.update(
      foundGym.uuid,
      dataToUpdate,
    );
    return this.gymsService.serializeGym(updatedGym);
  }
}
