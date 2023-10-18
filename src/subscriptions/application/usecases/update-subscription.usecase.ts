import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { ISubscription } from 'src/subscriptions/domain/entities/subscription.entity';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { UpdateSubscriptionDto } from '../dto';

@Injectable()
export class UpdateSubscriptionUseCase {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private dataServices: DatabaseServicesContract,
  ) {}

  async run(
    id: string,
    updateSubscriptionDto: UpdateSubscriptionDto,
  ): Promise<ISubscription> {
    const dataToUpdate: ISubscription =
      this.subscriptionsService.mapDtoToSubscription(updateSubscriptionDto);
    const updatedSubscription = await this.dataServices.subscriptions.update(
      id,
      dataToUpdate,
    );
    return this.subscriptionsService.serializeSubscription(updatedSubscription);
  }
}
