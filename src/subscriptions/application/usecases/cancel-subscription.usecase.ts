import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { ISubscription } from 'src/subscriptions/domain/entities/subscription.entity';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';

@Injectable()
export class DeleteSubscriptionUseCase {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private dataServices: DatabaseServicesContract,
  ) {}

  async run(uuid: string): Promise<ISubscription> {
    const foundSubscription: ISubscription =
      await this.dataServices.subscriptions.findOne({ uuid });
    if (foundSubscription) {
      const deletedSubscription = await this.dataServices.subscriptions.delete(
        foundSubscription.uuid,
      );
      return this.subscriptionsService.serializeSubscription(
        deletedSubscription,
      );
    }
    throw new NotFoundException();
  }
}
