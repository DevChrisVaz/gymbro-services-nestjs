import { Provider } from '@nestjs/common';
import { FindOneUseCaseContract } from 'src/core/contracts/usecase.contract';
import { ISubscription } from 'src/subscriptions/domain/entities/subscription.entity';
import { FindSubscriptionUseCase } from './find-subscription.usecase';

export const useCaseProviders: Provider[] = [
  {
    provide: FindOneUseCaseContract<ISubscription>,
    useClass: FindSubscriptionUseCase,
  },
];
