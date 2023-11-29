import { MongoDBRepository } from 'src/database/frameworks/mongodb/mongodb.repository';
import { IRole } from 'src/permitions/domain/entities/role.entity';
import { RoleRepositoryContract } from 'src/permitions/domain/repositories/role.repository';

export class RoleRepositoryImpl
  extends MongoDBRepository<IRole>
  implements RoleRepositoryContract {}
