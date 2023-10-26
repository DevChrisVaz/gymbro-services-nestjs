import { Injectable } from '@nestjs/common';
import { ICustomer } from 'src/customers/domain/entities/customer.entity';
import { CustomerNotFoundException } from 'src/customers/domain/exceptions/customer-not-found.exception';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { CustomerResponseDTO } from '../dto/response/customer-response.dto';
import { IUser } from 'src/users/domain/entities/User';

@Injectable()
export class GetCustomerProfileUseCase {
  constructor(private dataServices: DatabaseServicesContract) {}

  async run(email: string): Promise<CustomerResponseDTO> {
    const foundCustomer: ICustomer = await this.dataServices.customers.findOne({
      email,
    });

    if (foundCustomer) {
      const foundUser: IUser = await this.dataServices.users.findOne({
        uuid: foundCustomer.user,
      });

      return new CustomerResponseDTO({
        ...foundUser,
        ...foundCustomer,
      });
    }

    throw new CustomerNotFoundException();
  }
}
