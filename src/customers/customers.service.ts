import { Injectable } from '@nestjs/common';
import { CustomerFactoryService } from './application/customer-factory.service';
import { Customer } from './domain/entities/customer.entity';
import { FindCustomersUseCase } from './application/usecases/find-customers.usecase';
import { FindCustomerUseCase } from './application/usecases/find-customer.usecase';
import { CreateCustomerUseCase } from './application/usecases/create-customer.usecase';
import { UpdateCustomerUseCase } from './application/usecases/update-customer.usecase';
import { DeleteCustomerUseCase } from './application/usecases/delete-customer.usecase';
import { CreateCustomerDto, UpdateCustomerDto } from './application/dto';

@Injectable()
export class CustomersService {
  constructor(
    private customerFactoryService: CustomerFactoryService,
    private findCustomersUseCase: FindCustomersUseCase,
    private findCustomerUseCase: FindCustomerUseCase,
    private createCustomerUseCase: CreateCustomerUseCase,
    private updateCustomerUseCase: UpdateCustomerUseCase,
    private deleteCustomerUseCase: DeleteCustomerUseCase
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const customer: Customer = this.customerFactoryService.createNewCustomer(createCustomerDto);
    const createdCustomer: Customer = await this.createCustomerUseCase.run(customer);
    return createdCustomer;
  }

  async findMany() {
    const foundCustomers: Customer[] = await this.findCustomersUseCase.run();
    return foundCustomers;
  }

  async findOne(id: string) {
    const foundCustomer: Customer = await this.findCustomerUseCase.run(id);
    return foundCustomer;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  async remove(id: string) {
    const deletedCustomer: Customer = await this.deleteCustomerUseCase.run(id);
    return deletedCustomer;
  }
}
