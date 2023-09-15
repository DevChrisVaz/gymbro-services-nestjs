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
// import { TokenRepository } from "src/auth/frameworks/data/mongodb/token.repository";
// import { TokenDocument, TokenModel } from "src/auth/frameworks/data/mongodb/models/token.model";
import { AuthModel } from "src/auth/frameworks/data/mongodb/models/auth.model";
import { IAuth } from "src/auth/domain/entities/auth";
import { AuthRepositoryImpl } from "src/auth/frameworks/data/mongodb/auth.repository";
import { AuthRepository } from "src/auth/domain/repositories/auth.repository";

@Injectable()
export class MongoDBServices implements DatabaseServicesContract, OnApplicationBootstrap {
    users: UserRepositoryImpl;
    gyms: GymRepositoryImpl;
    customers: CustomerRepositoryImpl;
    // tokens: TokenRepository;
    auth: AuthRepository;

    constructor(
        @InjectModel(UserModel.name)
        private userRepository: Model<UserDocument>,
        @InjectModel(GymModel.name)
        private gymRepository: Model<GymDocument>,
        @InjectModel(CustomerModel.name)
        private customerRepository: Model<CustomerDocument>,
        // @InjectModel(TokenModel.name)
        // private tokenRepository: Model<TokenDocument>,
        @InjectModel(AuthModel.name)
        private authRepository: Model<IAuth>
    ) {}

    onApplicationBootstrap() {
        this.users = new UserRepositoryImpl(this.userRepository);
        this.gyms = new GymRepositoryImpl(this.gymRepository);
        this.customers = new CustomerRepositoryImpl(this.customerRepository);
        this.auth = new AuthRepositoryImpl(this.auth)
        // this.tokens = new TokenRepository(this.tokenRepository);
    }
}