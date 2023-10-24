import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchesController } from './branches.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CreateBranchUseCase, DeleteBranchUseCase, FindBranchesUseCase, UpdateBranchUseCase, useCaseProviders } from './application/usecases';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [BranchesController],
  providers: [
    BranchesService,
    ...useCaseProviders,
    FindBranchesUseCase,
    CreateBranchUseCase,
    UpdateBranchUseCase,
    DeleteBranchUseCase
  ],
  exports: [BranchesService]
})
export class BranchesModule { }
