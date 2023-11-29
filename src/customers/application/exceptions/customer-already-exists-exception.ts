import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomerAlreadyExistsException extends HttpException {
  constructor() {
    super('Customer already exists', HttpStatus.BAD_REQUEST);
  }
}
