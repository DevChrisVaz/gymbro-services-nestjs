import { Provider } from '@nestjs/common';
import { FindOneUseCaseContract } from 'src/core/contracts/usecase.contract';
import { IPlan } from 'src/plans/domain/entities/plan.entity';
import { FindGymUseCase } from './find-gym.usecase';

export const useCaseProviders: Provider[] = [
  {
    provide: FindOneUseCaseContract<IPlan>,
    useClass: FindGymUseCase,
  },
];
