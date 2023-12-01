import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { IPlan } from 'src/plans/domain/entities/plan.entity';
import { PlansService } from 'src/plans/plans.service';

@Injectable()
export class FindPlansUseCase {
  constructor(
    private readonly plansService: PlansService,
    private readonly dataServices: DatabaseServicesContract,
  ) {}

  async run(): Promise<IPlan[]> {
    const foundPlans: IPlan[] = await this.dataServices.plans.find({});
    return foundPlans.map((plan) => this.plansService.serializePlan(plan));
  }
}
