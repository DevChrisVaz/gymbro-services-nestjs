import { MongoDBRepository } from 'src/database/frameworks/mongodb/mongodb.repository';
import { ISubscription } from 'src/subscriptions/domain/entities/subscription.entity';

export class SubscriptionRepositoryImpl extends MongoDBRepository<ISubscription> {}
