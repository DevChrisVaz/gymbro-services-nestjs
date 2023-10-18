import { RepositoryContract } from 'src/database/domain/contracts/repository.contract';
import { IAuth } from '../entities/auth';

export abstract class AuthRepository extends RepositoryContract<IAuth> {}
