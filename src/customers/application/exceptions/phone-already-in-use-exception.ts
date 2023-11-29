import { HttpException, HttpStatus } from '@nestjs/common';

export class PhoneAlreadyInUseException extends HttpException {
  constructor() {
    super(
      'The phone number belongs to another account',
      HttpStatus.BAD_REQUEST,
    );
  }
}
