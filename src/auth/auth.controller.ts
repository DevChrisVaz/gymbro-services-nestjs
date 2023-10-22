import {
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { LogInDto } from './application/dtos';
import { LoginUseCase } from './application/usecases/login.usecase';
import { CookieOptions, Response } from 'express';
import { Public } from './auth.decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Public()
  @Post('login')
  async logIn(@Body() logInDto: LogInDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.loginUseCase.run(logInDto);

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60,
      path: '/token',
    };

    res.cookie('token', refreshToken, cookieOptions);

    return { token: accessToken }
  }
}
