import { MongoDBRepository } from 'src/database/frameworks/mongodb/mongodb.repository';
import { IGym } from 'src/gyms/domain/entities/gym.entity';

export class GymRepositoryImpl extends MongoDBRepository<IGym> {}
