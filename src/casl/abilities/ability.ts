import { AbilityBuilder, AnyAbility, ExtractSubjectType } from '@casl/ability';
import { AppAbility, Subjects } from '../casl-ability/casl-ability';

export abstract class Abilities {
  constructor(protected ability: AbilityBuilder<AppAbility>) {}

  abstract defineAbilities(user: any): AnyAbility;

  build() {
    return this.ability.build({
      detectSubjectType: (item) =>
        item.constructor as unknown as ExtractSubjectType<Subjects>,
    });
  }
}
