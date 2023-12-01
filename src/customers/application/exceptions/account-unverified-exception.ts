import { HttpException, HttpStatus } from '@nestjs/common';

export class AccountUnverifiedException extends HttpException {
  constructor() {
    super(
      "Account isn't verified, please check your email",
      HttpStatus.FORBIDDEN,
    );
  }
}
