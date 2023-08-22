import { Injectable } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data-services.abstract";
import { Customer } from "src/customers/domain/entities/customer.entity";

@Injectable()
export class DeleteCustomerUseCase {
    constructor(
        private dataServices: IDataServices
    ) {}

    async run(id: string): Promise<Customer> {
        const deletedCustomer = await this.dataServices.customers.delete(id);
        return deletedCustomer;
    }
}