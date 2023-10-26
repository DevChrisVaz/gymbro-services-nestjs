import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { DatabaseModule } from 'src/database/database.module';
import { FindPlansUseCase } from './application/usecases/find-plans.usecase';
import { CreatePlanUseCase } from './application/usecases/create-plan.usecase';
import { UpdatePlanUseCase } from './application/usecases/update-plan.usecase';
import { DeletePlanUseCase } from './application/usecases/delete-plan.usecase';
import { useCaseProviders } from './application/usecases/providers';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [
    DatabaseModule,
    CaslModule
  ],
  controllers: [PlansController],
  providers: [
    PlansService,
    ...useCaseProviders,
    FindPlansUseCase,
    CreatePlanUseCase,
    UpdatePlanUseCase,
    DeletePlanUseCase,
  ],
})
export class PlansModule {}
