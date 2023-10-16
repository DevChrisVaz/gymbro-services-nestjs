import { Injectable } from "@nestjs/common";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";
import { IPlan } from "src/plans/domain/entities/plan.entity";

@Injectable()
export class UpdatePlanUseCase {
    constructor(
        private dataServices: DatabaseServicesContract
    ) {}

    async run(id: string): Promise<IPlan> {
        const updatedPlan = await this.dataServices.plans.update(id, {  } as IPlan);
        return updatedPlan;
    }
}