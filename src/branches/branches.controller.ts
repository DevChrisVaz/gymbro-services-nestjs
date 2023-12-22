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
  Req,
  Query,
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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { FindRegistryInterceptor } from 'src/core/interceptors/find-registry.interceptor';
import { AddUUIDInterceptor } from 'src/core/interceptors/add-uuid.interceptor';
import { AddAddressUUIDInterceptor } from 'src/addresses/interceptors/add-address-uuid.interceptor';
import { Public } from 'src/auth/decorators/public.decorator';
import { FindPlansByBranchUseCase } from 'src/plans/application/usecases/find-plans-by-branch.usecase';
import { IPlan } from 'src/plans/domain/entities/plan.entity';
import { BranchResponseDto } from './application/dto/responses/branch-response.dto';
import { UserAuthenticatedRequest } from 'src/auth/auth';
import { BranchWithAddressResponseDto } from './application/dto/responses/branch-with-address-response.dto';
import { FindGymBranchesUseCase } from './application/usecases/find-gym-branches-usecase';
import { FindBranchUsersUseCase } from './application/usecases/find-branch-users.usecase';
import { FindBranchEquipmentUseCase } from 'src/equipment/application/usecases/find-branch-equipment.usecase';
import { GetCustomerBranchActiveSubscriptionUseCase } from './application/usecases/get-customer-branch-active-subscription.usecase';

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
    private readonly findGymBranchesUseCase: FindGymBranchesUseCase,
    private readonly findBranchUsersUseCase: FindBranchUsersUseCase,
    private readonly findBranchEquipmentUseCase: FindBranchEquipmentUseCase,
    private readonly getCustomerBranchActiveSubscriptionUseCase: GetCustomerBranchActiveSubscriptionUseCase
  ) { }

  @UseInterceptors(AddUUIDInterceptor)
  @UseInterceptors(AddAddressUUIDInterceptor)
  @ApiCreatedResponse({
    type: BranchResponseDto,
  })
  @Post()
  create(
    @Req() req: UserAuthenticatedRequest,
    @Body() createBranchDto: CreateBranchDto,
    @Query() query: any,
  ) {
    createBranchDto.gym = req.user.gym ?? query.gymId;
    return this.createBranchUseCase.run(createBranchDto);
  }

  @Public()
  @Get()
  @ApiOkResponse({
    type: BranchWithAddressResponseDto,
  })
  findAll() {
    return this.findBranchesUseCase.run();
  }

  @Get('/gym')
  @ApiOkResponse({
    type: BranchWithAddressResponseDto,
  })
  findByGym(@Req() req: UserAuthenticatedRequest, @Query() query: any) {
    return this.findGymBranchesUseCase.run(req.user.gym ?? query.gymId);
  }

  @Public()
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

  @UseInterceptors(FindRegistryInterceptor<IBranch>)
  @Get(':id/users')
  getUsers(@Param('id', ParseUUIDPipe) id: string) {
    return this.findBranchUsersUseCase.run(id);
  }

  @Public()
  @UseInterceptors(FindRegistryInterceptor<IBranch>)
  @Get(':id/equipment')
  getEquipment(@Param('id', ParseUUIDPipe) id: string) {
    return this.findBranchEquipmentUseCase.run(id);
  }

  @UseInterceptors(FindRegistryInterceptor<IBranch>)
  @Get(':id/:customer/active')
  getCustomerActiveSubscription(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('customer', ParseUUIDPipe) customer: string
  ) {
    return this.getCustomerBranchActiveSubscriptionUseCase.run(id, customer);
  }
}
