import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseInterceptors } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from './application/dto';
import { CreateCustomerUseCase, DeleteCustomerUseCase, FindCustomerUseCase, FindCustomersUseCase, UpdateCustomerUseCase } from './application/usecases';
import { Public } from 'src/auth/auth.decorators';
import { AddUuidToBodyPipe } from 'src/core/pipes/add-uuid.pipe';
import { AddUUIDInterceptor } from 'src/core/interceptors/add-uuid.interceptor';

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly findCustomersUseCase: FindCustomersUseCase,
    private readonly findCustomerUseCase: FindCustomerUseCase,
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.updateCustomerUseCase.run(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteCustomerUseCase.run(id);
  }
}
