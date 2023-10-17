import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { IPlan } from 'src/plans/domain/entities/plan.entity';
import { PlanNotFoundException } from 'src/plans/domain/exceptions/plan-not-found.exception';
import { PlansService } from 'src/plans/plans.service';

@Injectable()
export class DeletePlanUseCase {
  constructor(
    private readonly plansService: PlansService,
    private dataServices: DatabaseServicesContract,
  ) {}

  async run(uuid: string): Promise<IPlan> {
    const foundPlan: IPlan = await this.dataServices.plans.findOne({ uuid });
    if (foundPlan) {
      const deletedPlan = await this.dataServices.plans.delete(foundPlan.uuid);
      return this.plansService.serializePlan(deletedPlan);
    }
    throw new PlanNotFoundException();
  }
}
