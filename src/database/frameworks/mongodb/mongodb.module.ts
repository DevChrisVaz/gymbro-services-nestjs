import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserModel,
  UserSchema,
} from 'src/users/frameworks/data/mogodb/models/user.model';
import { MongoDBServices } from './mongodb.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  GymModel,
  GymSchema,
} from 'src/gyms/frameworks/data/mongodb/models/gym.model';
import {
  CustomerModel,
  CustomerSchema,
} from 'src/customers/frameworks/data/mongodb/models/customer.model';
import mongodbConfig from './mongodb.config';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import {
  AuthModel,
  AuthSchema,
} from 'src/auth/frameworks/data/mongodb/models/auth.model';
import {
  TokenModel,
  TokenSchema,
} from 'src/auth/frameworks/data/mongodb/models/token.model';
import {
  PlanModel,
  PlanSchema,
} from 'src/plans/frameworks/data/mongodb/models/plan.model';
import {
  SubscriptionModel,
  SubscriptionSchema,
} from 'src/subscriptions/frameworks/data/mongodb/models/subscription.model';

@Module({
  imports: [
    ConfigModule.forFeature(mongodbConfig),
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      { name: GymModel.name, schema: GymSchema },
      { name: CustomerModel.name, schema: CustomerSchema },
      { name: AuthModel.name, schema: AuthSchema },
      { name: TokenModel.name, schema: TokenSchema },
      { name: PlanModel.name, schema: PlanSchema },
      { name: SubscriptionModel.name, schema: SubscriptionSchema },
    ]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('mongoUri'),
      }),
    }),
  ],
  providers: [
    {
      provide: DatabaseServicesContract,
      useClass: MongoDBServices,
    },
  ],
  exports: [DatabaseServicesContract],
})
export class MongoDBModule {}
