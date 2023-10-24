import { Module } from '@nestjs/common';
import { GymsService } from './gyms.service';
import { GymsController } from './gyms.controller';
import { FindGymsUseCase } from './application/usecases/find-gyms.usecase';
import { CreateGymUseCase } from './application/usecases/create-gym.usecase';
import { UpdateGymUseCase } from './application/usecases/update-gym.usecase';
import { DeleteGymUseCase } from './application/usecases/delete-gym.usecase';
import { DatabaseModule } from 'src/database/database.module';
import { useCaseProviders } from './application/usecases/providers';
import { GetGymWithPlansUseCase } from './application/usecases/get-gym-with-plans.usecase';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule
  ],
  controllers: [GymsController],
  providers: [
    GymsService,
    ...useCaseProviders,
    FindGymsUseCase,
    CreateGymUseCase,
    UpdateGymUseCase,
    DeleteGymUseCase,
    GetGymWithPlansUseCase
  ],
})
export class GymsModule {}
