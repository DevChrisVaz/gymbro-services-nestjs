import { IPerson } from '../entities/person.entity';

export abstract class PersonCacheServiceContract {
  abstract storePerson(person: IPerson): Promise<void>;
  abstract getPerson(key: string): Promise<IPerson | null>;
  abstract removePerson(key: string): Promise<void>;
}
