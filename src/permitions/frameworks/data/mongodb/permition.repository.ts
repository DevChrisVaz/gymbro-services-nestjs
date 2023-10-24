import { IPermition } from 'src/permitions/domain/entities/permition.entity';
import { PermitionRepositoryContract } from 'src/permitions/domain/repositories/permition.repository';
import { MongoDBRepository } from 'src/database/frameworks/mongodb/mongodb.repository';

export class PermitionRepositoryImpl extends MongoDBRepository<IPermition> implements PermitionRepositoryContract { }
