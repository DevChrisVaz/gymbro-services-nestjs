import { Injectable } from "@nestjs/common";
import { Customer } from "src/customers/domain/entities/customer.entity";
import { CustomerNotFoundException } from "src/customers/domain/exceptions/customer-not-found.exception";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";

@Injectable()
export class UpdateCustomerUseCase {
    constructor(
        private dataServices: DatabaseServicesContract
    ) {}

    async run(id: string, customer: Customer): Promise<Customer> {
        if (await this.dataServices.customers.findOne({})) {
            const updatedCustomers: Customer = await this.dataServices.customers.update(id, customer);
            return updatedCustomers;
        }

        throw new CustomerNotFoundException();
    }
}