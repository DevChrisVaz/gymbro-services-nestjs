import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from './application/dto';
import { CreateCustomerUseCase, DeleteCustomerUseCase, FindCustomersUseCase, UpdateCustomerUseCase } from './application/usecases';
import { Public } from 'src/auth/auth.decorators';
import { AddUUIDInterceptor } from 'src/core/interceptors/add-uuid.interceptor';
import { FindOneUseCaseContract } from 'src/core/contracts/usecase.contract';
import { ICustomer } from './domain/entities/customer.entity';
import { FindRegistryInterceptor } from 'src/core/interceptors/find-registry.interceptor';

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly findCustomersUseCase: FindCustomersUseCase,
    private readonly findCustomerUseCase: FindOneUseCaseContract<ICustomer>,
    private readonly updateCustomerUseCase: UpdateCustomerUseCase,
    private readonly deleteCustomerUseCase: DeleteCustomerUseCase
  ) {}

  @Public()
  @UseInterceptors(AddUUIDInterceptor)
  @Post("register")
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.createCustomerUseCase.run(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.findCustomersUseCase.run();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findCustomerUseCase.run(id);
  }

  @UseInterceptors(FindRegistryInterceptor<ICustomer>)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.updateCustomerUseCase.run(id, updateCustomerDto);
  }

  @UseInterceptors(FindRegistryInterceptor<ICustomer>)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteCustomerUseCase.run(id);
  }
}
