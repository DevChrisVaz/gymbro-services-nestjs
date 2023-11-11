import { RepositoryContract } from 'src/database/domain/contracts/repository.contract';
import { User } from '../entities/user.entity';

export abstract class UserRepositoryContract extends RepositoryContract<User> {}
