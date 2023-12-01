import { RepositoryContract } from 'src/database/domain/contracts/repository.contract';
import { IUserRole } from '../entities/user-role.entity';

export abstract class UserRolesRepositoryContract extends RepositoryContract<IUserRole> {}
