import { RepositoryContract } from 'src/database/domain/contracts/repository.contract';
import { IGym } from '../entities/gym.entity';

export abstract class GymRepositoryContract extends RepositoryContract<IGym> {}
