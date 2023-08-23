import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CustomerFactoryService } from './application/customer-factory.service';
import { FindCustomerUseCase } from './application/usecases/find-customer.usecase';
import { FindCustomersUseCase } from './application/usecases/find-customers.usecase';
import { CreateCustomerUseCase } from './application/usecases/create-customer.usecase';
import { UpdateCustomerUseCase } from './application/usecases/update-customer.usecase';
import { DatabaseModule } from 'src/database/database.module';
import { DeleteCustomerUseCase } from './application/usecases/delete-customer.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    CustomerFactoryService,
    FindCustomerUseCase,
    FindCustomersUseCase,
    CreateCustomerUseCase,
    UpdateCustomerUseCase,
    DeleteCustomerUseCase
  ],
  exports: [CustomersService]
})
export class CustomersModule {}
