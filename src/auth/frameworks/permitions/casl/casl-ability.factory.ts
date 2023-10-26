// import { Injectable } from "@nestjs/common";
// import { Action } from "src/auth/domain/entities/action";
// import { Role } from "src/auth/domain/entities/roles";
// import { Plan } from "src/plans/domain/entities/plan.entity";
// import { User } from "src/users/domain/entities/User";
// import { AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects, PureAbility } from "@casl/ability";

// type Subjects = InferSubjects<typeof Plan | typeof User> | 'all';

// export type AppAbility = PureAbility<[Action, Subjects]>;

// @Injectable()
// export class CaslAbilityFactory {
//     createForUser(user: User) {
//         const { can, cannot, build } = new AbilityBuilder<
//             PureAbility<[Action, Subjects]>
//         >(PureAbility as AbilityClass<AppAbility>);

//         if (user.rol === Role.Admin) {
//             can(Action.Manage, 'all'); // read-write access to everything
//         } else {
//             can(Action.Read, 'all'); // read-only access to everything
//         }

//         can(Action.Update, Plan, { gym: user.id });
//         cannot(Action.Delete, Plan, { isPublished: true });

//         return build({
//             // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
//             detectSubjectType: (item) =>
//                 item.constructor as ExtractSubjectType<Subjects>,
//         });
//     }
// }
