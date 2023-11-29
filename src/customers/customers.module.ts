import { Global, Module } from '@nestjs/common';
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
import { customerNodemailerServiceProvider } from './frameworks/mailing/nodemailer/customer-nodemailer-service.provider';
import { VerifyCustomerAccountUseCase } from './application/usecases/verify-customer-account.usecase';
import { customerCacheServiceProvider } from './frameworks/cache/customer-cache-service.provider';

@Global()
@Module({
  imports: [DatabaseModule, EncryptionModule, UsersModule, AuthModule],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    customerNodemailerServiceProvider,
    customerCacheServiceProvider,
    ...useCaseProviders,
    FindCustomersUseCase,
    CreateCustomerUseCase,
    VerifyCustomerAccountUseCase,
    UpdateCustomerUseCase,
    DeleteCustomerUseCase,
    GetCustomerSubscriptionsUseCase,
  ],
  exports: [CustomersService, customerCacheServiceProvider],
})
export class CustomersModule {}
