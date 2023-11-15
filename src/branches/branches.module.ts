import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchesController } from './branches.controller';
import { DatabaseModule } from 'src/database/database.module';
import {
  CreateBranchUseCase,
  DeleteBranchUseCase,
  FindBranchesUseCase,
  UpdateBranchUseCase,
  useCaseProviders,
} from './application/usecases';
import { AddressesModule } from 'src/addresses/addresses.module';
import { PlansModule } from 'src/plans/plans.module';
import { FindGymBranchesUseCase } from './application/usecases/find-gym-branches-usecase';

@Module({
  imports: [DatabaseModule, AddressesModule, PlansModule],
  controllers: [BranchesController],
  providers: [
    BranchesService,
    ...useCaseProviders,
    FindBranchesUseCase,
    FindGymBranchesUseCase,
    CreateBranchUseCase,
    UpdateBranchUseCase,
    DeleteBranchUseCase,
  ],
  exports: [BranchesService],
})
export class BranchesModule {}
