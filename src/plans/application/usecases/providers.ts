import { Provider } from '@nestjs/common';
import { FindPlanUseCase } from './find-plan.usecase';
import { FindOneUseCaseContract } from 'src/core/contracts/usecase.contract';
import { IPlan } from 'src/plans/domain/entities/plan.entity';

export const useCaseProviders: Provider[] = [
  {
    provide: FindOneUseCaseContract<IPlan>,
    useClass: FindPlanUseCase,
  },
];
