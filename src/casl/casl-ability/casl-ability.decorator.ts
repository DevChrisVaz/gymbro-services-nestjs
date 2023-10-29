import { SetMetadata } from '@nestjs/common';
import { Subjects } from './casl-ability';
import { Action } from '../domain/action';

export interface RequiredRule {
  action: Action;
  subject: Subjects;
}

export const CHECK_ABILITY = 'check_ability';

export const CheckAbilities = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements);
