import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { IGym } from 'src/gyms/domain/entities/gym.entity';
import { GymsService } from 'src/gyms/gyms.service';
import { IPlan } from 'src/plans/domain/entities/plan.entity';

@Injectable()
export class GetGymWithPlansUseCase {
  constructor(
    private readonly gymsService: GymsService,
    private dataServices: DatabaseServicesContract,
  ) {}

  async run(uuid: string): Promise<{ gym: IGym; plans: IPlan[] }> {
    const foundGym = await this.dataServices.gyms.findOne({ uuid });
    const plans = await this.dataServices.plans.find({ gym: foundGym.uuid });
    return { gym: this.gymsService.serializeGym(foundGym), plans };
  }
}
