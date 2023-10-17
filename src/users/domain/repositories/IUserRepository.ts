import { RepositoryContract } from 'src/database/domain/contracts/repository.contract';
import { User } from '../entities/User';

export abstract class UserRepositoryContract extends RepositoryContract<User> {}
