import { Injectable } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data-services.abstract";
import { Customer } from "src/customers/domain/entities/customer.entity";

@Injectable()
export class FindCustomersUseCase {
    constructor(
        private dataServices: IDataServices
    ) {}

    async run(): Promise<Customer[]> {
        const foundCustomers: Customer[] = await this.dataServices.customers.find();
        return foundCustomers;
    }
}