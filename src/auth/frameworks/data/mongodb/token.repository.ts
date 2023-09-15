import { Token, TokenContract } from "src/auth/domain/entities/token";
import { MongoDBRepository } from "src/database/frameworks/mongodb/mongodb.repository";

export class TokenRepository extends MongoDBRepository<TokenContract> { }