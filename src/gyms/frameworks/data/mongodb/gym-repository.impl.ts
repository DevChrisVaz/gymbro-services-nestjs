import { MongoDBRepository } from "src/core/frameworks/data/mongodb/mongodb.repository";
import { IGym } from "src/gyms/domain/entities/gym.entity";

export class GymRepositoryImpl extends MongoDBRepository<IGym> { }