import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GymsModule } from './gyms/gyms.module';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';
import ConfigModule from './config';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    GymsModule,
    CustomersModule,
    AuthModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
