import { Module } from '@nestjs/common';
import { GymsService } from './gyms.service';
import { GymsController } from './gyms.controller';
import { FindGymsUseCase } from './application/usecases/find-gyms.usecase';
import { CreateGymUseCase } from './application/usecases/create-gym.usecase';
import { UpdateGymUseCase } from './application/usecases/update-gym.usecase';
import { DeleteGymUseCase } from './application/usecases/delete-gym.usecase';
import { DatabaseModule } from 'src/database/database.module';
import { useCaseProviders } from './application/usecases/providers';

@Module({
  imports: [DatabaseModule],
  controllers: [GymsController],
  providers: [
    GymsService,
    ...useCaseProviders,
    FindGymsUseCase,
    CreateGymUseCase,
    UpdateGymUseCase,
    DeleteGymUseCase,
  ],
})
export class GymsModule {}
