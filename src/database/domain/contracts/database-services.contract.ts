import { IUser } from 'src/users/domain/entities/user.entity';
import { IGym } from 'src/gyms/domain/entities/gym.entity';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { RepositoryContract } from './repository.contract';
import { TokenContract } from 'src/auth/domain/entities/token';
import { IAuth } from 'src/auth/domain/entities/auth';
import { IPlan } from 'src/plans/domain/entities/plan.entity';
import { ISubscription } from 'src/subscriptions/domain/entities/subscription.entity';
import { IBranch } from 'src/branches/domain/entities/branch.entity';
import { IAddress } from 'src/addresses/domain/entities/address.entity';
import { IBranchPermition } from 'src/permitions/domain/entities/branch-permition.entity';
import { IGYMUser } from 'src/gyms/domain/entities/gym-user.entity';
import { SessionContract } from './session.contract';
import { IPerson } from 'src/users/domain/entities/person.entity';
import { IRole } from 'src/permitions/domain/entities/role.entity';
import { IUserRole } from 'src/permitions/domain/entities/user-role.entity';
import { IEquipment } from 'src/equipment/domain/entities/equipment.entity';

export abstract class DatabaseServicesContract {
  abstract session: SessionContract;
  abstract persons: RepositoryContract<IPerson>;
  abstract users: RepositoryContract<IUser>;
  abstract gyms: RepositoryContract<IGym>;
  abstract GYMUsers: RepositoryContract<IGYMUser>;
  abstract customers: RepositoryContract<Customer>;
  abstract tokens: RepositoryContract<TokenContract>;
  abstract auth: RepositoryContract<IAuth>;
  abstract plans: RepositoryContract<IPlan>;
  abstract subscriptions: RepositoryContract<ISubscription>;
  abstract branches: RepositoryContract<IBranch>;
  abstract addresses: RepositoryContract<IAddress>;
  abstract equipment: RepositoryContract<IEquipment>;

  abstract roles: RepositoryContract<IRole>;
  abstract userRoles: RepositoryContract<IUserRole>;
  abstract branchPermitions: RepositoryContract<IBranchPermition>;
}
