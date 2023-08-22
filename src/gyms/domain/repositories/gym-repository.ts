import { IGenericRepository } from "src/core/domain/repositories/generic-repository.abstract";
import { IGym } from "../entities/gym.entity";

export abstract class IGymRepository extends IGenericRepository<IGym> { }