import { IGenericRepository } from "src/core/domain/repositories/generic-repository.abstract";
import { Customer } from "../entities/customer.entity";

export abstract class ICustomerRepository extends IGenericRepository<Customer> { }