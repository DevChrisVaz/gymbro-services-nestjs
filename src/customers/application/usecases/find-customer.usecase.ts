import { Injectable } from '@nestjs/common';
import { ICustomer } from 'src/customers/domain/entities/customer.entity';
import { CustomerNotFoundException } from 'src/customers/domain/exceptions/customer-not-found.exception';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { CustomerResponseDTO } from '../dto/response/customer-response.dto';
import { IUser } from 'src/users/domain/entities/User';

@Injectable()
export class FindCustomerUseCase {
  constructor(private dataServices: DatabaseServicesContract) {}

  async run(uuid: string): Promise<CustomerResponseDTO> {
    const foundCustomer: ICustomer = await this.dataServices.customers.findOne({
      user: uuid,
    });

    if (foundCustomer) {
      const foundUser: IUser = await this.dataServices.users.findOne({ uuid });
      console.log(foundUser);

      return new CustomerResponseDTO({
        ...foundCustomer,
        ...foundUser,
      });
    }

    throw new CustomerNotFoundException();
  }
}
