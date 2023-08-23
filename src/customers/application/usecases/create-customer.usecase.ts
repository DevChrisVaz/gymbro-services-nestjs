import { Injectable } from "@nestjs/common";
import { Customer } from "src/customers/domain/entities/customer.entity";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";

@Injectable()
export class CreateCustomerUseCase {
    constructor(
        private dataServices: DatabaseServicesContract
    ) {}

    async run(customer: Customer): Promise<Customer> {
        const createdCustomer = await this.dataServices.customers.create(customer);
        return createdCustomer;
    }
}