import { RepositoryContract } from 'src/database/domain/contracts/repository.contract';
import { IBranchPermition } from '../entities/branch-permition.entity';

export abstract class BranchPermitionRepositoryContract extends RepositoryContract<IBranchPermition> {}
