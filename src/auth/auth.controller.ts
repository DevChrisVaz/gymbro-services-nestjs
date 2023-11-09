import { Body, Controller, Post, Put, Req, Res, UnauthorizedException } from '@nestjs/common';
import { LogInDto } from './application/dtos';
import { LoginUseCase } from './application/usecases/login.usecase';
import { CookieOptions, Request, Response } from 'express';
import { Public } from './decorators/public.decorator';
import { CustomerLoginUseCase } from './application/usecases/customer-login.usecase';
import { GYMUserLoginUseCase } from './application/usecases/gym-user-login.usecase';
import { RefreshSessionUseCase } from './application/usecases/refresh-session.usecase';
import { ITokens } from './domain/entities/tokens';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly loginUseCase: LoginUseCase,
    private readonly customerLoginUseCase: CustomerLoginUseCase,
    private readonly gymUserLoginUseCase: GYMUserLoginUseCase,
    private readonly refreshSessionUseCase: RefreshSessionUseCase
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

  @Post("gym-users")
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

  @Put("refresh-token")
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const token = this.authService.extractTokenFromHeader(req);

    if (!req.cookies.token || !token) throw new UnauthorizedException();

    const tokens: ITokens = await this.refreshSessionUseCase.run({
      accessToken: token,
      refreshToken: req.cookies.token,
    });

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60,
      path: '/token',
    };

    res.cookie('token', tokens.refreshToken, cookieOptions);

    return { token: tokens.accessToken }
  }
}
