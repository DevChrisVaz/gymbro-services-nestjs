import { RepositoryContract } from 'src/database/domain/contracts/repository.contract';
import { Customer } from '../entities/customer.entity';

export abstract class CustomerRepositoryContract extends RepositoryContract<Customer> {}
