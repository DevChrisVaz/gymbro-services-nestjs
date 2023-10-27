import { AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects, PureAbility } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Branch, IBranch } from "src/branches/domain/entities/branch.entity";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";
import { GYMUser, IGYMUser } from "src/gyms/domain/entities/gym-user.entity";
import { Gym } from "src/gyms/domain/entities/gym.entity";
import { BranchRole } from "src/permitions/domain/enums/branch-role.enum";
import { Plan } from "src/plans/domain/entities/plan.entity";

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

export type Subjects = InferSubjects<typeof GYMUser | typeof Branch | typeof Gym | typeof Plan> | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
    constructor(
        private readonly databaseServices: DatabaseServicesContract
    ) { }

    async defineAbilityFor(user: IGYMUser, branch: IBranch) {
        const { can, cannot, build } = new AbilityBuilder<
            PureAbility<[Action, Subjects]>
        >(PureAbility as AbilityClass<AppAbility>);

        const permition = await this.databaseServices.branchPermitions.findOne({
            user: user.user,
            branch: branch.uuid
        });

        if (permition) {
            if (permition.rol === BranchRole.MANAGER) {
                can(Action.Manage, 'all');
            }
        } 

        return build({
            // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
            detectSubjectType: (item) =>
                item.constructor as unknown as ExtractSubjectType<Subjects>,
        });
    }
}
