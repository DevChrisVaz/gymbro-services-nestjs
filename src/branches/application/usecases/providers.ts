import { Provider } from '@nestjs/common';
import { IBranch } from 'src/branches/domain/entities/branch.entity';
import { FindOneUseCaseContract } from 'src/core/contracts/usecase.contract';
import { FindBranchUseCase } from './find-branch.usecase';

export const useCaseProviders: Provider[] = [
  {
    provide: FindOneUseCaseContract<IBranch>,
    useClass: FindBranchUseCase,
  },
];
