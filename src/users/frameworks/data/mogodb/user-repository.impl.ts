import { MongoDBRepository } from 'src/database/frameworks/mongodb/mongodb.repository';
import { User } from 'src/users/domain/entities/user.entity';

export class UserRepositoryImpl extends MongoDBRepository<User> {}
