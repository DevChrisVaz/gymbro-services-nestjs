import { RepositoryContract } from 'src/database/domain/contracts/repository.contract';
import { IBranch } from '../entities/branch.entity';

export abstract class BranchRepositoryContract extends RepositoryContract<IBranch> {}
