import { MongoDBRepository } from 'src/database/frameworks/mongodb/mongodb.repository';
import { IPerson } from 'src/users/domain/entities/person.entity';

export class PersonRepositoryImpl extends MongoDBRepository<IPerson> {}
