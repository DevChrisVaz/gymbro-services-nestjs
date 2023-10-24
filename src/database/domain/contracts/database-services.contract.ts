import { User } from 'src/users/domain/entities/User';
import { IGym } from 'src/gyms/domain/entities/gym.entity';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { RepositoryContract } from './repository.contract';
import { TokenContract } from 'src/auth/domain/entities/token';
import { IAuth } from 'src/auth/domain/entities/auth';
import { IPlan } from 'src/plans/domain/entities/plan.entity';
import { ISubscription } from 'src/subscriptions/domain/entities/subscription.entity';
import { IBranch } from 'src/branches/domain/entities/branch.entity';
import { IAddress } from 'src/addresses/domain/entities/address.entity';
import { IPermition } from 'src/permitions/domain/entities/permition.entity';

export abstract class DatabaseServicesContract {
  abstract users: RepositoryContract<User>;
  abstract gyms: RepositoryContract<IGym>;
  abstract customers: RepositoryContract<Customer>;
  abstract tokens: RepositoryContract<TokenContract>;
  abstract auth: RepositoryContract<IAuth>;
  abstract plans: RepositoryContract<IPlan>;
  abstract subscriptions: RepositoryContract<ISubscription>;
  abstract branches: RepositoryContract<IBranch>;
  abstract addresses: RepositoryContract<IAddress>;
  abstract permitions: RepositoryContract<IPermition>
}
