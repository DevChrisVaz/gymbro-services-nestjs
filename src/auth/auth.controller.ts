import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './domain/dtos/log-in.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  logIn(@Body() logInDto: LogInDto) {
    // return this.authService.logIn(logInDto.userName, logInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
