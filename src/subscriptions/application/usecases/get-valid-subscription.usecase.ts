import { Injectable } from "@nestjs/common";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";
import { IPlan } from "src/plans/domain/entities/plan.entity";
import { ISubscription } from "src/subscriptions/domain/entities/subscription.entity";

@Injectable()
export class GetValidSubscriptionUseCase {
    constructor(private readonly databaseServices: DatabaseServicesContract) { }

    async run(subscription: ISubscription): Promise<ISubscription | void> {
        const plan: IPlan = await this.databaseServices.plans.findOne({ uuid: subscription.plan });
        const creationDate = new Date(subscription.createdAt);
        const endDate = new Date();
        endDate.setDate(creationDate.getDate() + plan.duration);
        if (new Date() < endDate) return;
        return subscription;
    }
}