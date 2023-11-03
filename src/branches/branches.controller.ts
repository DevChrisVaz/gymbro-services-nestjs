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
import { CreateBranchDto } from './application/dto/create-branch.dto';
import { UpdateBranchDto } from './application/dto/update-branch.dto';
import {
  CreateBranchUseCase,
  DeleteBranchUseCase,
  FindBranchesUseCase,
  UpdateBranchUseCase,
} from './application/usecases';
import { FindOneUseCaseContract } from 'src/core/contracts/usecase.contract';
import { IBranch } from './domain/entities/branch.entity';
import { ApiBearerAuth, ApiCreatedResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { FindRegistryInterceptor } from 'src/core/interceptors/find-registry.interceptor';
import { AddUUIDInterceptor } from 'src/core/interceptors/add-uuid.interceptor';
import { AddAddressUUIDInterceptor } from 'src/addresses/interceptors/add-address-uuid.interceptor';
import { Public } from 'src/auth/decorators/public.decorator';
import { FindPlansByBranchUseCase } from 'src/plans/application/usecases/find-plans-by-branch.usecase';
import { IPlan } from 'src/plans/domain/entities/plan.entity';
import { BranchResponseDto } from './application/dto/responses/branch-response.dto';

@ApiSecurity('api_key')
@ApiBearerAuth()
@ApiTags('Branches')
@Controller('branches')
export class BranchesController {
  constructor(
    private readonly createBranchUseCase: CreateBranchUseCase,
    private readonly findBranchesUseCase: FindBranchesUseCase,
    private readonly findBranchUseCase: FindOneUseCaseContract<IBranch>,
    private readonly updateBranchUseCase: UpdateBranchUseCase,
    private readonly deleteBranchUseCase: DeleteBranchUseCase,
    private readonly findPlansByBranchUseCase: FindPlansByBranchUseCase,
  ) { }

  @UseInterceptors(AddUUIDInterceptor)
  @UseInterceptors(AddAddressUUIDInterceptor)
  @ApiCreatedResponse({
    type: BranchResponseDto
  })
  @Post()
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.createBranchUseCase.run(createBranchDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.findBranchesUseCase.run();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findBranchUseCase.run(id);
  }

  @UseInterceptors(FindRegistryInterceptor<IBranch>)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.updateBranchUseCase.run(id, updateBranchDto);
  }

  @UseInterceptors(FindRegistryInterceptor<IBranch>)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteBranchUseCase.run(id);
  }

  @Public()
  @UseInterceptors(FindRegistryInterceptor<IBranch>)
  @Get(':id/plans')
  async getPlans(@Param('id', ParseUUIDPipe) id: string) {
    const branch: IBranch = await this.findBranchUseCase.run(id);
    const plans: IPlan[] = await this.findPlansByBranchUseCase.run(id);
    return { ...branch, plans };
  }
}
