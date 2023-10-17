import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { PlansService } from 'src/plans/plans.service';
import { UpdatePlanDto } from '../dto';
import { IPlan } from 'src/plans/domain/entities/plan.entity';

@Injectable()
export class UpdatePlanUseCase {
  constructor(
    private readonly plansService: PlansService,
    private dataServices: DatabaseServicesContract,
  ) {}

  async run(uuid: string, updatePlanDto: UpdatePlanDto): Promise<IPlan> {
    const dataToUpdate = this.plansService.mapDtoToPlan(updatePlanDto);
    const updatedPlan = await this.dataServices.plans.update(
      uuid,
      dataToUpdate,
    );
    return this.plansService.serializePlan(updatedPlan);
  }
}
