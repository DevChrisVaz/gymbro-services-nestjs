import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { CaslAbilityFactory } from "../casl-ability.factory/casl-ability.factory";
import { CHECK_ABILITY, RequiredRule } from "../casl-ability.factory/casl-ability.decorator";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";
import { ForbiddenError } from "@casl/ability";

@Injectable()
export class AbilitiesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private caslAbilityFactory: CaslAbilityFactory,
        private readonly databaseServices: DatabaseServicesContract
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const rules = this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) || [];

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const branch = await this.databaseServices.branches.findOne({ uuid: request.body.branch });
        const ability = await this.caslAbilityFactory.defineAbilityFor(user, branch);

        try {
            rules.forEach(rule =>
                ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject)
            );

            return true;
        } catch (error) {
            if (error instanceof ForbiddenError) {
                throw new ForbiddenException(error.message);
            }
        }
    }
}