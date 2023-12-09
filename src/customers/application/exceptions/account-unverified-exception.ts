import { UnauthorizedException } from '@nestjs/common';

export class AccountUnverifiedException extends UnauthorizedException {
  constructor() {
    super({
      error: "unverified_account",
      message: "Account isn't verified, please check your email",
    });
  }
}
