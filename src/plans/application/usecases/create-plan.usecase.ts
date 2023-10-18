import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { PlansService } from 'src/plans/plans.service';
import { CreatePlanDto } from '../dto';
import { IPlan } from 'src/plans/domain/entities/plan.entity';
import { CreatePlanUseCaseContract } from 'src/plans/domain/contracts/use-cases.contracts';

@Injectable()
export class CreatePlanUseCase extends CreatePlanUseCaseContract {
  constructor(
    private readonly plansService: PlansService,
    private dataServices: DatabaseServicesContract,
  ) {
    super();
  }

  async run(createPlanDto: CreatePlanDto): Promise<IPlan> {
    const plan = this.plansService.mapDtoToPlan(createPlanDto);
    const createdPlan: IPlan = await this.dataServices.plans.save(plan);
    return this.plansService.serializePlan(createdPlan);
  }
}
