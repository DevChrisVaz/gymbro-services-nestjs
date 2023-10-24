import { RepositoryContract } from 'src/database/domain/contracts/repository.contract';
import { IGymManager } from '../entities/gym-manager.entity';

export abstract class GymManagerRepositoryContract extends RepositoryContract<IGymManager> {}
