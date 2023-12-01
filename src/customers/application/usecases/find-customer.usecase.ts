import { Injectable } from '@nestjs/common';
import { ICustomer } from 'src/customers/domain/entities/customer.entity';
import { CustomerNotFoundException } from 'src/customers/domain/exceptions/customer-not-found.exception';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { CustomerResponseDTO } from '../dto/response/customer-response.dto';
import { IPerson } from 'src/users/domain/entities/person.entity';

@Injectable()
export class FindCustomerUseCase {
  constructor(private dataServices: DatabaseServicesContract) {}

  async run(uuid: string): Promise<CustomerResponseDTO> {
    const foundCustomer: ICustomer = await this.dataServices.customers.findOne({
      person: uuid,
    });

    if (foundCustomer) {
      const foundPerson: IPerson = await this.dataServices.persons.findOne({
        uuid,
      });

      return new CustomerResponseDTO({
        ...foundCustomer,
        ...foundPerson,
      });
    }

    throw new CustomerNotFoundException();
  }
}
