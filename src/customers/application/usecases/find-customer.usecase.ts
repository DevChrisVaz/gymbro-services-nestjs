import { Injectable } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data-services.abstract";
import { Customer } from "src/customers/domain/entities/customer.entity";
import { CustomerNotFoundException } from "src/customers/domain/exceptions/customer-not-found.exception";

@Injectable()
export class FindCustomerUseCase {
    constructor(
        private dataServices: IDataServices
    ) {}

    async run(id: string): Promise<Customer> {
        const foundCustomer: Customer = await this.dataServices.customers.findOne(id);
        if (foundCustomer) {
            return foundCustomer;
        }

        throw new CustomerNotFoundException();
    }
}