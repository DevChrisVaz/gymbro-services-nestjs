import { Injectable } from '@nestjs/common';
import { UseCaseContract } from 'src/core/contracts/usecase.contract';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { IPlan } from 'src/plans/domain/entities/plan.entity';
import { PlanNotFoundException } from 'src/plans/domain/exceptions/plan-not-found.exception';
import { PlansService } from 'src/plans/plans.service';

@Injectable()
export class FindPlanUseCase
  implements UseCaseContract<string, Promise<IPlan>>
{
  constructor(
    private readonly plansService: PlansService,
    private dataServices: DatabaseServicesContract,
  ) {}

  async run(uuid: string): Promise<IPlan> {
    const foundPlan = await this.dataServices.plans.findOne({ uuid });
    if (foundPlan) return this.plansService.serializePlan(foundPlan);
    throw new PlanNotFoundException();
  }
}
