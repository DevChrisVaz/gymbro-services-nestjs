import { Injectable } from '@nestjs/common';
import { ICustomer } from 'src/customers/domain/entities/customer.entity';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { CustomerResponseDTO } from '../dto/response/customer-response.dto';
import { IPerson } from 'src/users/domain/entities/person.entity';

@Injectable()
export class FindCustomersUseCase {
  constructor(private dataServices: DatabaseServicesContract) {}

  async run(): Promise<CustomerResponseDTO[]> {
    const foundCustomers: ICustomer[] = await this.dataServices.customers.find(
      {},
    );
    return await Promise.all(
      foundCustomers.map(async (customer) => {
        const foundPerson: IPerson = await this.dataServices.persons.findOne({
          uuid: customer.person,
        });

        return new CustomerResponseDTO({
          ...foundPerson,
          ...customer,
        });
      }),
    );
  }
}
