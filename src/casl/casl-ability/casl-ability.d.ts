import { PureAbility } from '@casl/ability';
import { Branch } from 'src/branches/domain/entities/branch.entity';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { GYMUser } from 'src/gyms/domain/entities/gym-user.entity';
import { Gym } from 'src/gyms/domain/entities/gym.entity';
import { Plan } from 'src/plans/domain/entities/plan.entity';

export type Subjects =
  | InferSubjects<
      | typeof GYMUser
      | typeof Branch
      | typeof Gym
      | typeof Plan
      | typeof Customer
    >
  | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;
