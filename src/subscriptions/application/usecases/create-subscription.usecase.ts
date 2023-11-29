import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { CreateSubscriptionDto } from '../dto';
import { ISubscription } from 'src/subscriptions/domain/entities/subscription.entity';
import { AlreadySubscribedException } from '../exceptions/already-subscribed-exception';

@Injectable()
export class CreateSubscriptionUseCase {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private dataServices: DatabaseServicesContract,
  ) {}

  async run(createPlanDto: CreateSubscriptionDto): Promise<ISubscription> {
    const foundSubscription = await this.dataServices.subscriptions.findOne({
      customer: createPlanDto.customer,
      plan: createPlanDto.plan,
    });

    if (foundSubscription) throw new AlreadySubscribedException();

    const subscription =
      this.subscriptionsService.mapDtoToSubscription(createPlanDto);
    const createdSubscription: ISubscription =
      await this.dataServices.subscriptions.save(subscription);
    return this.subscriptionsService.serializeSubscription(createdSubscription);
  }
}
