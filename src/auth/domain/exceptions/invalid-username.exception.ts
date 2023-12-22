import { NotFoundException } from '@nestjs/common';

export class InvalidUserNameException extends NotFoundException {
  constructor() {
    super({
      error: "user_not_found",
      message: "User not found"
    });
  }
}