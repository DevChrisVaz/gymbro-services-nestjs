import { Injectable } from '@nestjs/common';
import { IBranch } from 'src/branches/domain/entities/branch.entity';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { IPlan } from 'src/plans/domain/entities/plan.entity';
import { GetCustomerSubscriptionResponseDto } from 'src/subscriptions/application/dto/responses/get-customer-subscription-response.dto';
import { ISubscription } from 'src/subscriptions/domain/entities/subscription.entity';

@Injectable()
export class GetCustomerSubscriptionsUseCase {
  constructor(private dataServices: DatabaseServicesContract) {}

  async run(uuid: string): Promise<GetCustomerSubscriptionResponseDto[]> {
    const foundSubscriptions: ISubscription[] =
      await this.dataServices.subscriptions.find({ customer: uuid });
    const detailedSubscriptions = await Promise.all(
      foundSubscriptions.map(async (subscription) => {
        const plan: IPlan = await this.dataServices.plans.findOne({
          uuid: subscription.plan,
        });
        const branch: IBranch = await this.dataServices.branches.findOne({
          uuid: plan.branch,
        });
        return {
          uuid: subscription.uuid,
          status: subscription.status,
          plan,
          branch,
          createdAt: subscription.createdAt,
          updatedAt: subscription.updatedAt,
        };
      }),
    );
    return detailedSubscriptions;
  }
}
