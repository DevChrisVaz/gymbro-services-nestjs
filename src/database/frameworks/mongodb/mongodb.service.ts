import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data-services.abstract";
import { UserModel, UserDocument } from "src/users/frameworks/data/mogodb/models/user.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserRepositoryImpl } from "src/users/frameworks/data/mogodb/user-repository.impl";
import { GymDocument, GymModel } from "src/gyms/frameworks/data/mongodb/models/gym.model";
import { GymRepositoryImpl } from "src/gyms/frameworks/data/mongodb/gym-repository.impl";
import { CustomerRepositoryImpl } from "src/customers/frameworks/data/mongodb/customer-repository.impl";
import { CustomerDocument, CustomerModel } from "src/customers/frameworks/data/mongodb/models/customer.model";

@Injectable()
export class MongoDBServices implements IDataServices, OnApplicationBootstrap {
    users: UserRepositoryImpl;
    gyms: GymRepositoryImpl;
    customers: CustomerRepositoryImpl;

    constructor(
        @InjectModel(UserModel.name)
        private userRepository: Model<UserDocument>,
        @InjectModel(GymModel.name)
        private gymRepository: Model<GymDocument>,
        @InjectModel(CustomerModel.name)
        private customerRepository: Model<CustomerDocument>,
    ) {}

    onApplicationBootstrap() {
        this.users = new UserRepositoryImpl(this.userRepository);
        this.gyms = new GymRepositoryImpl(this.gymRepository);
        this.customers = new CustomerRepositoryImpl(this.customerRepository);
    }
}