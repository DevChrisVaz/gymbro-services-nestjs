// import { AbilityBuilder, AnyAbility } from '@casl/ability';
// import { Abilities } from './ability';
// import { AppAbility } from '../casl-ability/casl-ability';
// import { Action } from '../domain/action';
// import { Branch } from 'src/branches/domain/entities/branch.entity';
// import { AuthenticatedUser } from 'src/auth/auth';

// export class BranchAbilities extends Abilities {
//   constructor(ability: AbilityBuilder<AppAbility>) {
//     super(ability);
//   }

//   defineAbilities(user: AuthenticatedUser): AnyAbility {
//     const allowedBranches: string[] = user.permitions.map(
//       (allowed) => allowed.branch,
//     );

//     this.ability.can(Action.Update, Branch, { uuid: { $in: allowedBranches } });

//     return this.build();
//   }
// }
