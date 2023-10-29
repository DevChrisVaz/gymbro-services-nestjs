import {
  AbilityBuilder,
  AbilityClass,
  AnyAbility,
  ExtractSubjectType,
  PureAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { GYMUser } from 'src/gyms/domain/entities/gym-user.entity';
import { CustomerAbilities } from '../abilities/customer-abilities';
import { AppAbility, Subjects } from './casl-ability';
import { Subscription } from 'src/subscriptions/domain/entities/subscription.entity';
import { SubscriptionAbilities } from '../abilities/subscription-abilities';

@Injectable()
export class CaslAbilityFactory {
  defineAbility(user: any, subject?: Subjects): AnyAbility {
    const ability = new AbilityBuilder<AppAbility>(
      PureAbility as AbilityClass<AppAbility>,
    );

    switch (subject) {
      case Customer:
        return new CustomerAbilities(ability).defineAbilities(user);
      case GYMUser:
        return;
      case Subscription:
        return new SubscriptionAbilities(ability).defineAbilities(user);
      default:
        break;
    }

    return ability.build({
      detectSubjectType: (item) =>
        item.constructor as unknown as ExtractSubjectType<Subjects>,
    });
  }
}
