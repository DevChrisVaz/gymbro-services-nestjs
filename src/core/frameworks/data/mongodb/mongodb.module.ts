import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IDataServices } from 'src/core/abstracts/data-services.abstract';
import { UserModel, UserSchema } from 'src/users/frameworks/data/mogodb/models/user.model';
import { MongoDBServices } from './mongodb.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GymModel, GymSchema } from 'src/gyms/frameworks/data/mongodb/models/gym.model';
import { CustomerModel, CustomerSchema } from 'src/customers/frameworks/data/mongodb/models/customer.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: UserModel.name, schema: UserSchema },
            { name: GymModel.name, schema: GymSchema },
            { name: CustomerModel.name, schema: CustomerSchema }
        ]),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                uri: config.get<string>('database.uri')
            })
        })
    ],
    providers: [
        {
            provide: IDataServices,
            useClass: MongoDBServices
        }
    ],
    exports: [IDataServices]
})
export class MongoDBModule {};