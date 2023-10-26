import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GymsModule } from './gyms/gyms.module';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';
import { PlansModule } from './plans/plans.module';
import ConfigModule from './core/config';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { BranchesModule } from './branches/branches.module';
import { AddressesModule } from './addresses/addresses.module';
import { PermitionsModule } from './permitions/permitions.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    GymsModule,
    CustomersModule,
    AuthModule,
    SubscriptionsModule,
    PlansModule,
    BranchesModule,
    AddressesModule,
    PermitionsModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
