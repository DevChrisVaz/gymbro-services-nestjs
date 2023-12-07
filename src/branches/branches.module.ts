import { Global, Module } from '@nestjs/common';
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
import { FindBranchUsersUseCase } from './application/usecases/find-branch-users.usecase';
import { FindBranchEquipmentUseCase } from 'src/equipment/application/usecases/find-branch-equipment.usecase';
import { GetCustomerBranchActiveSubscriptionUseCase } from './application/usecases/get-customer-branch-active-subscription.usecase';

@Global()
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
    FindBranchUsersUseCase,
    FindBranchEquipmentUseCase,
    GetCustomerBranchActiveSubscriptionUseCase
  ],
  exports: [BranchesService, CreateBranchUseCase],
})
export class BranchesModule {}
