import { Customer } from 'src/customers/domain/entities/customer.entity';
import { MongoDBRepository } from 'src/database/frameworks/mongodb/mongodb.repository';

export class CustomerRepositoryImpl extends MongoDBRepository<Customer> {}
