import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { DatabaseModule } from 'src/database/database.module';
import { FindPlansUseCase } from './application/usecases/find-plans.usecase';
import { FindPlanUseCase } from './application/usecases/find-plan.usecase';
import { CreatePlanUseCase } from './application/usecases/create-plan.usecase';
import { UpdatePlanUseCase } from './application/usecases/update-plan.usecase';
import { DeletePlanUseCase } from './application/usecases/delete-plan.usecase';
import { IPlan } from './domain/entities/plan.entity';
import { UseCaseContract } from 'src/core/contracts/usecase.contract';

@Module({
  imports: [DatabaseModule],
  controllers: [PlansController],
  providers: [
    PlansService,
    FindPlansUseCase,
    {
      provide: UseCaseContract<string, Promise<IPlan>>,
      useClass: FindPlanUseCase
    },
    CreatePlanUseCase,
    UpdatePlanUseCase,
    DeletePlanUseCase
  ]
})
export class PlansModule {}
