import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { ISubscription } from 'src/subscriptions/domain/entities/subscription.entity';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';

@Injectable()
export class FindSubscriptionUseCase {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private dataServices: DatabaseServicesContract,
  ) {}

  async run(uuid: string): Promise<ISubscription> {
    const foundSubscription: ISubscription =
      await this.dataServices.subscriptions.findOne({ uuid });
    if (foundSubscription) {
      return this.subscriptionsService.serializeSubscription(foundSubscription);
    }

    throw new NotFoundException();
  }
}
