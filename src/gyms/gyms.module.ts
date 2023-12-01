import { Module } from '@nestjs/common';
import { GymsService } from './gyms.service';
import { GymsController } from './gyms.controller';
import { FindGymsUseCase } from './application/usecases/find-gyms.usecase';
import { CreateGymUseCase } from './application/usecases/create-gym.usecase';
import { UpdateGymUseCase } from './application/usecases/update-gym.usecase';
import { DeleteGymUseCase } from './application/usecases/delete-gym.usecase';
import { DatabaseModule } from 'src/database/database.module';
import { useCaseProviders } from './application/usecases/providers';
import { UsersModule } from 'src/users/users.module';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { AddNewUserUseCase } from './application/usecases/add-new-user.usecase';
import { GYMNodemailerServiceProvider } from './frameworks/mailing/nodemailer/gym-nodemailer-service.provider';

@Module({
  imports: [DatabaseModule, UsersModule, EncryptionModule],
  controllers: [GymsController],
  providers: [
    GymsService,
    GYMNodemailerServiceProvider,
    ...useCaseProviders,
    FindGymsUseCase,
    CreateGymUseCase,
    UpdateGymUseCase,
    DeleteGymUseCase,
    AddNewUserUseCase,
    CreateGymUseCase,
  ],
})
export class GymsModule {}
