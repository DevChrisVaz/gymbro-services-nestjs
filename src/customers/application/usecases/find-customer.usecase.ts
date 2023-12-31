import { Injectable } from "@nestjs/common";
import { Customer } from "src/customers/domain/entities/customer.entity";
import { CustomerNotFoundException } from "src/customers/domain/exceptions/customer-not-found.exception";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";

@Injectable()
export class FindCustomerUseCase {
    constructor(
        private dataServices: DatabaseServicesContract
    ) {}

    async run(id: string): Promise<Customer> {
        const foundCustomer: Customer = await this.dataServices.customers.findOne(id);
        if (foundCustomer) {
            return foundCustomer;
        }

        throw new CustomerNotFoundException();
    }
}