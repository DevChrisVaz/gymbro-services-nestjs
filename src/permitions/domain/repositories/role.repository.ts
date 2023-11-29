import { RepositoryContract } from 'src/database/domain/contracts/repository.contract';
import { IRole } from '../entities/role.entity';

export abstract class RoleRepositoryContract extends RepositoryContract<IRole> {}
