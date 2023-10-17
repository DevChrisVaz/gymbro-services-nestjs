import { Injectable } from '@nestjs/common';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';

@Injectable()
export class FindCustomersUseCase {
  constructor(private dataServices: DatabaseServicesContract) {}

  async run(): Promise<Customer[]> {
    const foundCustomers: Customer[] = await this.dataServices.customers.find(
      {},
    );
    return foundCustomers;
  }
}
