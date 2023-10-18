import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { FindCustomersUseCase } from './application/usecases/find-customers.usecase';
import { CreateCustomerUseCase } from './application/usecases/create-customer.usecase';
import { UpdateCustomerUseCase } from './application/usecases/update-customer.usecase';
import { DatabaseModule } from 'src/database/database.module';
import { DeleteCustomerUseCase } from './application/usecases/delete-customer.usecase';
import { useCaseProviders } from './application/usecases/providers';
import { GetCustomerProfileUseCase } from './application/usecases';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    ...useCaseProviders,
    FindCustomersUseCase,
    CreateCustomerUseCase,
    UpdateCustomerUseCase,
    DeleteCustomerUseCase,
    GetCustomerProfileUseCase
  ],
  exports: [CustomersService],
})
export class CustomersModule {}
