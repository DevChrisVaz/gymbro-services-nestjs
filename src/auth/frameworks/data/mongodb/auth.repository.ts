import { IAuth } from 'src/auth/domain/entities/auth';
import { AuthRepository } from 'src/auth/domain/repositories/auth.repository';
import { MongoDBRepository } from 'src/database/frameworks/mongodb/mongodb.repository';

export class AuthRepositoryImpl
  extends MongoDBRepository<IAuth>
  implements AuthRepository {}
