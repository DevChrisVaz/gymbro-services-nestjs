import { RepositoryContract } from 'src/database/domain/contracts/repository.contract';
import { IPlan } from '../entities/plan.entity';

export abstract class UserRepositoryContract extends RepositoryContract<IPlan> {}
