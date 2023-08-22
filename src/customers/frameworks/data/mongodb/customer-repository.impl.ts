import { MongoDBRepository } from "src/core/frameworks/data/mongodb/mongodb.repository";
import { Customer } from "src/customers/domain/entities/customer.entity";

export class CustomerRepositoryImpl extends MongoDBRepository<Customer> { }