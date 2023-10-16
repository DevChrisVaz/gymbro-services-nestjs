import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { UserModel, UserDocument } from "src/users/frameworks/data/mogodb/models/user.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserRepositoryImpl } from "src/users/frameworks/data/mogodb/user-repository.impl";
import { GymDocument, GymModel } from "src/gyms/frameworks/data/mongodb/models/gym.model";
import { GymRepositoryImpl } from "src/gyms/frameworks/data/mongodb/gym-repository.impl";
import { CustomerRepositoryImpl } from "src/customers/frameworks/data/mongodb/customer-repository.impl";
import { CustomerDocument, CustomerModel } from "src/customers/frameworks/data/mongodb/models/customer.model";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";
import { TokenRepository } from "src/auth/frameworks/data/mongodb/token.repository";
import { TokenDocument, TokenModel } from "src/auth/frameworks/data/mongodb/models/token.model";
import { AuthDocument, AuthModel } from "src/auth/frameworks/data/mongodb/models/auth.model";
import { AuthRepositoryImpl } from "src/auth/frameworks/data/mongodb/auth.repository";
import { AuthRepository } from "src/auth/domain/repositories/auth.repository";
import { RepositoryContract } from "src/database/domain/contracts/repository.contract";
import { IPlan } from "src/plans/domain/entities/plan.entity";
import { ISubscription } from "src/subscriptions/domain/entities/subscription.entity";
import { SubscriptionDocument, SubscriptionModel } from "src/subscriptions/frameworks/data/mongodb/models/subscription.model";
import { PlanDocument, PlanModel } from "src/plans/frameworks/data/mongodb/models/plan.model";
import { PlanRepositoryImpl } from "src/plans/frameworks/data/mongodb/plan.repository";
import { SubscriptionRepositoryImpl } from "src/subscriptions/frameworks/data/mongodb/subscription.repository";

@Injectable()
export class MongoDBServices implements DatabaseServicesContract, OnApplicationBootstrap {
    users: UserRepositoryImpl;
    gyms: GymRepositoryImpl;
    customers: CustomerRepositoryImpl;
    tokens: TokenRepository;
    auth: AuthRepository;
    plans: RepositoryContract<IPlan>;
    subscriptions: RepositoryContract<ISubscription>;

    constructor(
        @InjectModel(UserModel.name)
        private userRepository: Model<UserDocument>,
        @InjectModel(GymModel.name)
        private gymRepository: Model<GymDocument>,
        @InjectModel(CustomerModel.name)
        private customerRepository: Model<CustomerDocument>,
        @InjectModel(TokenModel.name)
        private tokenRepository: Model<TokenDocument>,
        @InjectModel(AuthModel.name)
        private authRepository: Model<AuthDocument>,
        @InjectModel(PlanModel.name)
        private planRepository: Model<PlanDocument>,
        @InjectModel(SubscriptionModel.name)
        private subscriptionRepository: Model<SubscriptionDocument>
    ) {}

    onApplicationBootstrap() {
        this.users = new UserRepositoryImpl(this.userRepository);
        this.gyms = new GymRepositoryImpl(this.gymRepository);
        this.customers = new CustomerRepositoryImpl(this.customerRepository);
        this.tokens = new TokenRepository(this.tokenRepository);
        this.auth = new AuthRepositoryImpl(this.authRepository);
        this.plans = new PlanRepositoryImpl(this.planRepository);
        this.subscriptions = new SubscriptionRepositoryImpl(this.subscriptionRepository);
    }
}