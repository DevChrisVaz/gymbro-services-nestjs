import { MongoDBRepository } from "src/core/frameworks/data/mongodb/mongodb.repository";
import { User } from "src/users/domain/entities/User";

export class UserRepositoryImpl extends MongoDBRepository<User> {}