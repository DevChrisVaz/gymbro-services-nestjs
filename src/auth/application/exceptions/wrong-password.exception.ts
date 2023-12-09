import { BadRequestException } from '@nestjs/common';

export class WrongPasswordException extends BadRequestException {
  constructor() {
    super({
      error: "wrong_password",
      message: "Password is not valid"
    });
  }
}