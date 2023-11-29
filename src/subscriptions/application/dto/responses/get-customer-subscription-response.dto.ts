import { IBranch } from 'src/branches/domain/entities/branch.entity';
import { IPlan } from 'src/plans/domain/entities/plan.entity';

export class GetCustomerSubscriptionResponseDto {
  uuid: string;
  status: string;
  plan: IPlan;
  branch: IBranch;
  createdAt: string;
  updatedAt: string;
}
