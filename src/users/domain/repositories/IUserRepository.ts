import { IGenericRepository } from "src/core/domain/repositories/generic-repository.abstract";
import { User } from "../entities/User";

export abstract class IUserRepository extends IGenericRepository<User> {}