import { Body, Controller, Post, Res } from '@nestjs/common';
import { LogInDto } from './application/dtos';
import { LoginUseCase } from './application/usecases/login.usecase';
import { CookieOptions, Response } from 'express';
import { Public } from './decorators/public.decorator';
import { CustomerLoginUseCase } from './application/usecases/customer-login.usecase';
import { GYMUserLoginUseCase } from './application/usecases/gym-user-login.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly customerLoginUseCase: CustomerLoginUseCase,
    private readonly gymUserLoginUseCase: GYMUserLoginUseCase
  ) { }

  @Public()
  @Post('login')
  async logIn(
    @Body() logInDto: LogInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.loginUseCase.run(logInDto);

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60,
      path: '/token',
    };

    res.cookie('token', refreshToken, cookieOptions);

    return { token: accessToken };
  }

  @Post("customers")
  async customerLogIn(@Body() logInDto: LogInDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.customerLoginUseCase.run(logInDto);

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60,
      path: '/token',
    };

    res.cookie('token', refreshToken, cookieOptions);

    return { token: accessToken };
  }

  @Post("users")
  async gymUserLogIn(@Body() logInDto: LogInDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.gymUserLoginUseCase.run(logInDto);

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60,
      path: '/token',
    };

    res.cookie('token', refreshToken, cookieOptions);

    return { token: accessToken };
  }
}
