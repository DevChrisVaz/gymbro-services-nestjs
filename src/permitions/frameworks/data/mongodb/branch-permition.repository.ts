import { IBranchPermition } from 'src/permitions/domain/entities/branch-permition.entity';
import { BranchPermitionRepositoryContract } from 'src/permitions/domain/repositories/branch-permition.repository';
import { MongoDBRepository } from 'src/database/frameworks/mongodb/mongodb.repository';

export class BranchPermitionRepositoryImpl
  extends MongoDBRepository<IBranchPermition>
  implements BranchPermitionRepositoryContract {}
