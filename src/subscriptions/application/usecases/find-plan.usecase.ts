import { Injectable } from "@nestjs/common";
import { CustomerNotFoundException } from "src/customers/domain/exceptions/customer-not-found.exception";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";
import { IPlan } from "src/plans/domain/entities/plan.entity";
// import { PlansService } from "src/plans/plans.service";

@Injectable()
export class FindPlanUseCase {
    constructor(
        // private readonly plansService: PlansService,
        private dataServices: DatabaseServicesContract
    ) {}

    async run(uuid: string): Promise<IPlan> {
        const foundPlan: IPlan = await this.dataServices.plans.findOne({ uuid });
        if (foundPlan) {
            return foundPlan;
        }

        throw new CustomerNotFoundException();
    }
}