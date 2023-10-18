import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { ISubscription } from 'src/subscriptions/domain/entities/subscription.entity';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';

@Injectable()
export class FindSubscriptionsUseCase {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly dataServices: DatabaseServicesContract,
  ) {}

  async run(): Promise<ISubscription[]> {
    const foundSubscription: ISubscription[] =
      await this.dataServices.subscriptions.find({});
    return foundSubscription.map((gym) =>
      this.subscriptionsService.serializeSubscription(gym),
    );
  }
}
