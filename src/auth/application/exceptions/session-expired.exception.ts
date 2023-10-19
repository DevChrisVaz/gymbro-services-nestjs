import { HttpException, HttpStatus } from '@nestjs/common';

export class SessionExpiredException extends HttpException {
  constructor() {
    super('Session Expired', HttpStatus.UNAUTHORIZED);
  }
}
