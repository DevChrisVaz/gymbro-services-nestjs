import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { CreateSubscriptionDto } from '../dto';
import { ISubscription } from 'src/subscriptions/domain/entities/subscription.entity';
import { AlreadySubscribedException } from '../exceptions/already-subscribed-exception';
import { GetValidSubscriptionUseCase } from './get-valid-subscription.usecase';

@Injectable()
export class CreateSubscriptionUseCase {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly databaseServices: DatabaseServicesContract,
    private readonly getValidSubcriptionUseCase: GetValidSubscriptionUseCase
  ) { }

  async run(createSubscriptionDto: CreateSubscriptionDto): Promise<ISubscription> {
    const foundSubscriptions: ISubscription[] = await this.databaseServices.subscriptions.find({
      customer: createSubscriptionDto.customer,
      plan: createSubscriptionDto.plan,
    });

    const activeSubscriptions = await Promise.all(foundSubscriptions.map(this.getValidSubcriptionUseCase.run))

    if (activeSubscriptions.length > 0)
      throw new AlreadySubscribedException();

    const subscription =
      this.subscriptionsService.mapDtoToSubscription(createSubscriptionDto);
    const createdSubscription: ISubscription =
      await this.databaseServices.subscriptions.save(subscription);
    return this.subscriptionsService.serializeSubscription(createdSubscription);
  }
}
