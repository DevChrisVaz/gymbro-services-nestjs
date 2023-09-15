import { IAuth } from "src/auth/domain/entities/auth"
import { MongoDBRepository } from "src/database/frameworks/mongodb/mongodb.repository";

export class AuthRepositoryImpl extends MongoDBRepository<IAuth> { }