import { Module } from '@nestjs/common';
import { GymsService } from './gyms.service';
import { GymsController } from './gyms.controller';
import { DataModule } from 'src/core/frameworks/data/data.module';
import { GymFactoryService } from './application/gym-factory.service';
import { FindGymUseCase } from './application/usecases/find-gym.usecase';
import { FindGymsUseCase } from './application/usecases/find-gyms.usecase';
import { CreateGymUseCase } from './application/usecases/create-gym.usecase';
import { UpdateGymUseCase } from './application/usecases/update-gym.usecase';
import { DeleteGymUseCase } from './application/usecases/delete-gym.usecase';

@Module({
  imports: [DataModule],
  controllers: [GymsController],
  providers: [
    GymsService,
    GymFactoryService,
    FindGymsUseCase,
    FindGymUseCase,
    CreateGymUseCase,
    UpdateGymUseCase,
    DeleteGymUseCase
  ]
})
export class GymsModule {}
