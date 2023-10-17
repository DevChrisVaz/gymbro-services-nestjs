import { HttpException, HttpStatus } from '@nestjs/common';

export class GymNotFoundException extends HttpException {
  constructor() {
    super('Gym not found', HttpStatus.NOT_FOUND);
  }
}
