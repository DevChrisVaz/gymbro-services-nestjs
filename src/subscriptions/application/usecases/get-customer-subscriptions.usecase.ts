import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { ISubscription } from 'src/subscriptions/domain/entities/subscription.entity';

@Injectable()
export class GetCustomerSubscriptionsUseCase {
  constructor(private dataServices: DatabaseServicesContract) {}

  async run(uuid: string): Promise<ISubscription[]> {
    const foundSubscriptions: ISubscription[] =
      await this.dataServices.subscriptions.find({ customer: uuid });
    return foundSubscriptions;
  }
}
