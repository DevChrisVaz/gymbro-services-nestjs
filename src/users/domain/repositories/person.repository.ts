import { RepositoryContract } from 'src/database/domain/contracts/repository.contract';
import { IPerson } from '../entities/person.entity';

export abstract class PersonRepositoryContract extends RepositoryContract<IPerson> {}
