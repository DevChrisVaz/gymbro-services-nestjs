import { AbilityBuilder, AnyAbility } from '@casl/ability';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { Abilities } from './ability';
import { AppAbility } from '../casl-ability/casl-ability';
import { Action } from '../domain/action';

export class CustomerAbilities extends Abilities {
  constructor(ability: AbilityBuilder<AppAbility>) {
    super(ability);
  }

  defineAbilities(user: any): AnyAbility {
    this.ability.can(Action.Update, Customer, { user: user.id });
    this.ability.can(Action.Read, Customer);

    return this.build();
  }
}
