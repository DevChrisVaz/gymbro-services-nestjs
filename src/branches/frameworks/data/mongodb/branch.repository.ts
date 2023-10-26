import { IBranch } from 'src/branches/domain/entities/branch.entity';
import { MongoDBRepository } from 'src/database/frameworks/mongodb/mongodb.repository';

export class BranchRepositoryImpl extends MongoDBRepository<IBranch> {}
