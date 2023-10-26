import { RepositoryContract } from 'src/database/domain/contracts/repository.contract';
import { IGYMUser } from '../entities/gym-user.entity';

export abstract class GYMUserRepositoryContract extends RepositoryContract<IGYMUser> {}
