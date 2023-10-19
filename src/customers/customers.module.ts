import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { DatabaseModule } from 'src/database/database.module';
import { useCaseProviders } from './application/usecases/providers';
import { CreateCustomerUseCase, DeleteCustomerUseCase, FindCustomersUseCase, GetCustomerProfileUseCase, GetCustomerSubscriptionsUseCase, UpdateCustomerUseCase } from './application/usecases';
import { EncryptionModule } from 'src/encryption/encryption.module';

@Module({
  imports: [
    DatabaseModule,
    EncryptionModule
  ],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    ...useCaseProviders,
    FindCustomersUseCase,
    CreateCustomerUseCase,
    UpdateCustomerUseCase,
    DeleteCustomerUseCase,
    GetCustomerProfileUseCase,
    GetCustomerSubscriptionsUseCase
  ],
  exports: [CustomersService],
})
export class CustomersModule {}
