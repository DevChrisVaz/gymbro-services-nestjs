import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { IPlan } from 'src/plans/domain/entities/plan.entity';
import { PlansService } from 'src/plans/plans.service';

@Injectable()
export class FindPlansByBranchUseCase {
  constructor(
    private readonly plansService: PlansService,
    private readonly dataServices: DatabaseServicesContract,
  ) {}

  async run(branchId: string): Promise<IPlan[]> {
    const foundPlans: IPlan[] = await this.dataServices.plans.find({
      branch: branchId,
    });
    return foundPlans.map((gym) => this.plansService.serializePlan(gym));
  }
}
