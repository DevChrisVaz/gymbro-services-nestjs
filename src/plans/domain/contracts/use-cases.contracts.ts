import { UseCaseContract } from 'src/core/contracts/usecase.contract';
import { IPlan } from '../entities/plan.entity';

export abstract class FindPlansUseCaseContract extends UseCaseContract<
  Record<string, unknown>,
  Promise<IPlan[]>
> {}

export abstract class FindPlanUseCaseContract extends UseCaseContract<
  string,
  Promise<IPlan>
> {}

export abstract class CreatePlanUseCaseContract extends UseCaseContract<
  IPlan,
  Promise<IPlan>
> {}

export abstract class UpdatePlanUseCaseContract extends UseCaseContract<
  IPlan,
  Promise<IPlan>
> {}

export abstract class DeletePlanUseCaseContract extends UseCaseContract<
  IPlan,
  Promise<IPlan>
> {}
