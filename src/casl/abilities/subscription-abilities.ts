import { AbilityBuilder, AnyAbility } from '@casl/ability';
import { AppAbility } from '../casl-ability/casl-ability';
import { Abilities } from './ability';
import { Subscription } from 'src/subscriptions/domain/entities/subscription.entity';
import { Action } from '../domain/action';

export class SubscriptionAbilities extends Abilities {
  constructor(ability: AbilityBuilder<AppAbility>) {
    super(ability);
  }

  defineAbilities(user: any): AnyAbility {
    this.ability.can(Action.Create, Subscription);
    this.ability.can(Action.Update, Subscription, { customer: user.id });
    this.ability.can(Action.Read, Subscription, { customer: user.id });

    return this.build();
  }
}
