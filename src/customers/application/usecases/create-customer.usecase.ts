import { Injectable } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data-services.abstract";
import { Customer } from "src/customers/domain/entities/customer.entity";

@Injectable()
export class CreateCustomerUseCase {
    constructor(
        private dataServices: IDataServices
    ) {}

    async run(customer: Customer): Promise<Customer> {
        const createdCustomer = await this.dataServices.customers.create(customer);
        return createdCustomer;
    }
}