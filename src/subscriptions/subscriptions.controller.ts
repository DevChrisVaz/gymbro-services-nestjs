import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './application/dto';
import { UpdateSubscriptionDto } from './application/dto';
import { CreateSubscriptionUseCase } from './application/usecases/create-subscription.usecase';
import { FindSubscriptionsUseCase } from './application/usecases/find-suscriptions.usecase';
import { FindSubscriptionUseCase } from './application/usecases/find-subscription.usecase';
import { UpdateSubscriptionUseCase } from './application/usecases/update-subscription.usecase';
import { DeleteSubscriptionUseCase } from './application/usecases/cancel-subscription.usecase';
import { AddUUIDInterceptor } from 'src/core/interceptors/add-uuid.interceptor';
import { FindOneUseCaseContract } from 'src/core/contracts/usecase.contract';
import { ISubscription } from './domain/entities/subscription.entity';
import { FindRegistryInterceptor } from 'src/core/interceptors/find-registry.interceptor';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly createSubscriptionUseCase: CreateSubscriptionUseCase,
    private readonly findSubscriptionsUseCase: FindSubscriptionsUseCase,
    private readonly findSubscriptionUseCase: FindOneUseCaseContract<ISubscription>,
    private readonly updateSubscriptionUseCase: UpdateSubscriptionUseCase,
    private readonly deleteSubscriptionUseCase: DeleteSubscriptionUseCase
  ) {}

  @UseInterceptors(AddUUIDInterceptor)
  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.createSubscriptionUseCase.run(createSubscriptionDto);
  }

  @Get()
  findAll() {
    return this.findSubscriptionsUseCase.run();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findSubscriptionUseCase.run(id);
  }

  @UseInterceptors(FindRegistryInterceptor<ISubscription>)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.updateSubscriptionUseCase.run(id, updateSubscriptionDto);
  }

  @UseInterceptors(FindRegistryInterceptor<ISubscription>)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteSubscriptionUseCase.run(id);
  }
}
