import { RepositoryContract } from 'src/database/domain/contracts/repository.contract';
import { IPermition } from '../entities/permition.entity';

export abstract class PermitionRepositoryContract extends RepositoryContract<IPermition> {}
