import { MongoDBRepository } from 'src/database/frameworks/mongodb/mongodb.repository';
import { IPlan } from 'src/plans/domain/entities/plan.entity';

export class PlanRepositoryImpl extends MongoDBRepository<IPlan> {}
