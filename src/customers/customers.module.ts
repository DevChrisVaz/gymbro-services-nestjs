import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CustomerFactoryService } from './application/customer-factory.service';
import { FindCustomersUseCase } from './application/usecases/find-customers.usecase';
import { CreateCustomerUseCase } from './application/usecases/create-customer.usecase';
import { UpdateCustomerUseCase } from './application/usecases/update-customer.usecase';
import { DatabaseModule } from 'src/database/database.module';
import { DeleteCustomerUseCase } from './application/usecases/delete-customer.usecase';
import { useCaseProviders } from './application/usecases/providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    ...useCaseProviders,
    CustomerFactoryService,
    FindCustomersUseCase,
    CreateCustomerUseCase,
    UpdateCustomerUseCase,
    DeleteCustomerUseCase,
  ],
  exports: [CustomersService],
})
export class CustomersModule {}
