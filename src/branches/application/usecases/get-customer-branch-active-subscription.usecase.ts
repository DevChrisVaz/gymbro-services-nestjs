import { Injectable } from "@nestjs/common";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";
import { IPlan } from "src/plans/domain/entities/plan.entity";
import { ISubscription } from "src/subscriptions/domain/entities/subscription.entity";
import find from "lodash/find";
import map from "lodash/map";

@Injectable()
export class GetCustomerBranchActiveSubscriptionUseCase {
    constructor(private readonly databaseServices: DatabaseServicesContract) { }

    async run(branch: string, customer: string): Promise<ISubscription> {
        const plans: IPlan[] = await this.databaseServices.plans.find({ branch });

        const activeSubscription: ISubscription[] = await Promise.all(plans.map(async (plan: IPlan) => {
            const subscriptions: ISubscription[] = await this.databaseServices.subscriptions.find({
                plan: plan.uuid,
                customer
            });
            const creationDate = new Date();
            creationDate.setDate(creationDate.getDate() - plan.duration);
            const currentSubscription: ISubscription[] = subscriptions.map((s: ISubscription) => {
                if (new Date(s.createdAt) >= creationDate)
                    return s;
            })
            return currentSubscription[0];
        }));

        return activeSubscription[0];
    }
}