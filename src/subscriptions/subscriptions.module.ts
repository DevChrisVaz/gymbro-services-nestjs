import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { useCaseProviders } from './application/usecases/providers';
import { CreateSubscriptionUseCase } from './application/usecases/create-subscription.usecase';
import { FindSubscriptionsUseCase } from './application/usecases/find-suscriptions.usecase';
import { UpdateSubscriptionUseCase } from './application/usecases/update-subscription.usecase';
import { DeleteSubscriptionUseCase } from './application/usecases/cancel-subscription.usecase';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [SubscriptionsController],
  providers: [
    SubscriptionsService,
    ...useCaseProviders,
    CreateSubscriptionUseCase,
    FindSubscriptionsUseCase,
    UpdateSubscriptionUseCase,
    DeleteSubscriptionUseCase
  ],
})
export class SubscriptionsModule {}
