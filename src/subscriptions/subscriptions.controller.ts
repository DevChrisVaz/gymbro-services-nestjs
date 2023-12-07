import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Request,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateSubscriptionDto } from './application/dto';
import { UpdateSubscriptionDto } from './application/dto';
import { AddUUIDInterceptor } from 'src/core/interceptors/add-uuid.interceptor';
import { FindOneUseCaseContract } from 'src/core/contracts/usecase.contract';
import { ISubscription } from './domain/entities/subscription.entity';
import { FindRegistryInterceptor } from 'src/core/interceptors/find-registry.interceptor';
import {
  CreateSubscriptionUseCase,
  DeleteSubscriptionUseCase,
  FindSubscriptionsUseCase,
  GetCustomerSubscriptionsUseCase,
  UpdateSubscriptionUseCase,
} from './application/usecases';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly createSubscriptionUseCase: CreateSubscriptionUseCase,
    private readonly findSubscriptionsUseCase: FindSubscriptionsUseCase,
    private readonly findSubscriptionUseCase: FindOneUseCaseContract<ISubscription>,
    private readonly updateSubscriptionUseCase: UpdateSubscriptionUseCase,
    private readonly deleteSubscriptionUseCase: DeleteSubscriptionUseCase,
    private readonly getCustomerSubscriptionsUseCase: GetCustomerSubscriptionsUseCase,
  ) { }

  @UseInterceptors(AddUUIDInterceptor)
  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto, @Request() req) {
    createSubscriptionDto.customer = req.user.id;
    return this.createSubscriptionUseCase.run(createSubscriptionDto);
  }

  @Get()
  findAll() {
    return this.findSubscriptionsUseCase.run();
  }

  @Get('customers/:id')
  getCustomerSubscriptions(@Param('id', ParseUUIDPipe) id: string) {
    return this.getCustomerSubscriptionsUseCase.run(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findSubscriptionUseCase.run(id);
  }

  @UseInterceptors(FindRegistryInterceptor<ISubscription>)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return this.updateSubscriptionUseCase.run(id, updateSubscriptionDto);
  }

  @UseInterceptors(FindRegistryInterceptor<ISubscription>)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteSubscriptionUseCase.run(id);
  }
}