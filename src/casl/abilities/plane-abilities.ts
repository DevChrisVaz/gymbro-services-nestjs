// import { AbilityBuilder, AnyAbility } from '@casl/ability';
// import { Abilities } from './ability';
// import { AppAbility } from '../casl-ability/casl-ability';
// import { Action } from '../domain/action';
// import { AuthenticatedUser } from 'src/auth/auth';
// import { Plan } from 'src/plans/domain/entities/plan.entity';

// export class PlanAbilities extends Abilities {
//   constructor(ability: AbilityBuilder<AppAbility>) {
//     super(ability);
//   }

//   defineAbilities(user: AuthenticatedUser): AnyAbility {
//     const allowedBranches: string[] = user.permitions.map(
//       (allowed) => allowed.branch,
//     );

//     this.ability.can(Action.Update, Plan, { branch: { $in: allowedBranches } });

//     return this.build();
//   }
// }
