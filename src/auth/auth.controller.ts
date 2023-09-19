import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { LogInDto } from './domain/dtos/log-in.dto';
import { AuthGuard } from './auth.guard';
import { LoginUseCase } from './application/usecases/login.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  logIn(@Body() logInDto: LogInDto) {
    return this.loginUseCase.run(logInDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
