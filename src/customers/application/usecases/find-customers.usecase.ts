import { Injectable } from '@nestjs/common';
import { ICustomer } from 'src/customers/domain/entities/customer.entity';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { IUser } from 'src/users/domain/entities/User';
import { CustomerResponseDTO } from '../dto/response/customer-response.dto';

@Injectable()
export class FindCustomersUseCase {
  constructor(private dataServices: DatabaseServicesContract) {}

  async run(): Promise<CustomerResponseDTO[]> {
    const foundCustomers: ICustomer[] = await this.dataServices.customers.find(
      {},
    );
    return await Promise.all(
      foundCustomers.map(async (customer) => {
        const foundUser: IUser = await this.dataServices.users.findOne({
          uuid: customer.user,
        });

        return new CustomerResponseDTO({
          ...foundUser,
          ...customer,
        });
      }),
    );
  }
}
