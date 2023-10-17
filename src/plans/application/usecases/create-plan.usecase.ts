import { Injectable } from "@nestjs/common";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";
import { PlansService } from "src/plans/plans.service";
import { CreatePlanDto } from "../dto";
import { IPlan, Plan } from "src/plans/domain/entities/plan.entity";

@Injectable()
export class CreatePlanUseCase {
    constructor(
        private readonly plansService: PlansService,
        private dataServices: DatabaseServicesContract
    ) {}

    async run(createPlanDto: CreatePlanDto): Promise<IPlan> {
        const plan = this.plansService.mapDtoToPlan(createPlanDto);
        const createdPlan: IPlan = await this.dataServices.plans.save(plan);
        return this.plansService.serializePlan(createdPlan);
    }
}