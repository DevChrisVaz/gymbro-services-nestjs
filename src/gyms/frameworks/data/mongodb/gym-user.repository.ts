import { MongoDBRepository } from 'src/database/frameworks/mongodb/mongodb.repository';
import { IGYMUser } from 'src/gyms/domain/entities/gym-user.entity';

export class GYMUserRepositoryImpl extends MongoDBRepository<IGYMUser> {}
