import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './application/dto';
import { UpdateSubscriptionDto } from './application/dto';
import { plainToClass } from 'class-transformer';
import {
  ISubscription,
  SerializedSubscription,
  Subscription,
} from './domain/entities/subscription.entity';

@Injectable()
export class SubscriptionsService {
  mapDtoToSubscription(
    dto: CreateSubscriptionDto | UpdateSubscriptionDto,
  ): ISubscription {
    return plainToClass(Subscription, dto);
  }

  serializeSubscription(plan: ISubscription): SerializedSubscription {
    return new SerializedSubscription(plan);
  }
}
