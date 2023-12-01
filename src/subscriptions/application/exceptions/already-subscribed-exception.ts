import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadySubscribedException extends HttpException {
  constructor() {
    super('You are already subscribed to this plan', HttpStatus.BAD_REQUEST);
  }
}
