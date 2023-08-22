import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { DataModule } from 'src/core/frameworks/data/data.module';
import { CustomerFactoryService } from './application/customer-factory.service';
import { FindCustomerUseCase } from './application/usecases/find-customer.usecase';
import { FindCustomersUseCase } from './application/usecases/find-customers.usecase';
import { CreateCustomerUseCase } from './application/usecases/create-customer.usecase';
import { UpdateCustomerUseCase } from './application/usecases/update-customer.usecase';

@Module({
  imports: [DataModule],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    CustomerFactoryService,
    FindCustomerUseCase,
    FindCustomersUseCase,
    CreateCustomerUseCase,
    UpdateCustomerUseCase
  ]
})
export class CustomersModule {}
