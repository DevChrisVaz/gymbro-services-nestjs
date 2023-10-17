import { Injectable } from '@nestjs/common';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';

@Injectable()
export class DeleteCustomerUseCase {
  constructor(private dataServices: DatabaseServicesContract) {}

  async run(id: string): Promise<Customer> {
    const deletedCustomer = await this.dataServices.customers.delete(id);
    return deletedCustomer;
  }
}
