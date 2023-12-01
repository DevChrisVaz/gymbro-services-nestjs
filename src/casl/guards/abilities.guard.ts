import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  CHECK_ABILITY,
  RequiredRule,
} from '../casl-ability/casl-ability.decorator';
import { ForbiddenError } from '@casl/ability';

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const subject = request.subject;
    // const ability = this.caslAbilityFactory.defineAbility(user, subject);

    try {
      // rules.forEach((rule) =>
      //   ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject),
      // );

      return true;
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }
}
