import { HttpException, HttpStatus } from '@nestjs/common';

export class BranchNotFoundException extends HttpException {
  constructor() {
    super('Branch not found', HttpStatus.NOT_FOUND);
  }
}
