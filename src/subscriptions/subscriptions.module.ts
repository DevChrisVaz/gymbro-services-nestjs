import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { useCaseProviders } from './application/usecases/providers';
import { DatabaseModule } from 'src/database/database.module';
import {
  CreateSubscriptionUseCase,
  DeleteSubscriptionUseCase,
  FindSubscriptionsUseCase,
  GetCustomerSubscriptionsUseCase,
  UpdateSubscriptionUseCase,
} from './application/usecases';
import { GetValidSubscriptionUseCase } from './application/usecases/get-valid-subscription.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [SubscriptionsController],
  providers: [
    SubscriptionsService,
    ...useCaseProviders,
    CreateSubscriptionUseCase,
    FindSubscriptionsUseCase,
    UpdateSubscriptionUseCase,
    DeleteSubscriptionUseCase,
    GetCustomerSubscriptionsUseCase,
    GetValidSubscriptionUseCase
  ],
})
export class SubscriptionsModule { }
