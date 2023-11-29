import { MongoDBRepository } from 'src/database/frameworks/mongodb/mongodb.repository';
import { IUserRole } from 'src/permitions/domain/entities/user-role.entity';
import { UserRolesRepositoryContract } from 'src/permitions/domain/repositories/user-roles.entity';

export class UserRoleRepositoryImpl
  extends MongoDBRepository<IUserRole>
  implements UserRolesRepositoryContract {}
