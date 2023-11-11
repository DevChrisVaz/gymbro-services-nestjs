import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { DatabaseModule } from 'src/database/database.module';
import { useCaseProviders } from './application/usecases/providers';
import {
  CreateCustomerUseCase,
  DeleteCustomerUseCase,
  FindCustomersUseCase,
  GetCustomerSubscriptionsUseCase,
  UpdateCustomerUseCase,
} from './application/usecases';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    EncryptionModule,
    UsersModule,
    AuthModule
  ],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    ...useCaseProviders,
    FindCustomersUseCase,
    CreateCustomerUseCase,
    UpdateCustomerUseCase,
    DeleteCustomerUseCase,
    GetCustomerSubscriptionsUseCase,
  ],
  exports: [CustomersService],
})
export class CustomersModule { }
