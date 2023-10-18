import { RepositoryContract } from 'src/database/domain/contracts/repository.contract';
import { ISubscription } from '../entities/subscription.entity';

export abstract class UserRepositoryContract extends RepositoryContract<ISubscription> {}
