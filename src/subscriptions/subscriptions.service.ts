import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './application/dto';
import { UpdateSubscriptionDto } from './application/dto';

@Injectable()
export class SubscriptionsService {
  create(createSubscriptionDto: CreateSubscriptionDto) {
    return 'This action adds a new subscription';
  }

  findAll() {
    return `This action returns all subscriptions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscription`;
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return `This action updates a #${id} subscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }
}
