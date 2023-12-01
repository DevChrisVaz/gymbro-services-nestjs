import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreatePlanDto, UpdatePlanDto } from './application/dto';
import {
  CreatePlanUseCase,
  DeletePlanUseCase,
  FindPlansByBranchUseCase,
  FindPlansUseCase,
  UpdatePlanUseCase,
} from './application/usecases';
import { AddUUIDInterceptor } from 'src/core/interceptors/add-uuid.interceptor';
import { FindRegistryInterceptor } from 'src/core/interceptors/find-registry.interceptor';
import { IPlan } from './domain/entities/plan.entity';
import { FindOneUseCaseContract } from 'src/core/contracts/usecase.contract';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiSecurity('api_key')
@ApiBearerAuth()
@ApiTags('Plans')
@Controller('plans')
export class PlansController {
  constructor(
    private readonly createPlanUseCase: CreatePlanUseCase,
    private readonly findPlanUseCase: FindOneUseCaseContract<IPlan>,
    private readonly findPlansUseCase: FindPlansUseCase,
    private readonly findPlansByBranch: FindPlansByBranchUseCase,
    private readonly updatePlanUseCase: UpdatePlanUseCase,
    private readonly deletePlanUseCase: DeletePlanUseCase,
  ) {}

  @UseInterceptors(AddUUIDInterceptor)
  @Post()
  // @UseGuards(AbilitiesGuard)
  // @CheckAbilities({ action: Action.Create, subject: Plan })
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.createPlanUseCase.run(createPlanDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.findPlansUseCase.run();
  }

  @Public()
  @Get(':branchId')
  findBranchPlans(@Param('branchId', ParseUUIDPipe) branchId: string) {
    return this.findPlansByBranch.run(branchId);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findPlanUseCase.run(id);
  }

  @UseInterceptors(FindRegistryInterceptor<IPlan>)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    return this.updatePlanUseCase.run(id, updatePlanDto);
  }

  @UseInterceptors(FindRegistryInterceptor<IPlan>)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deletePlanUseCase.run(id);
  }
}
