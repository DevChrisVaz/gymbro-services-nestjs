import {
  Body,
  Controller,
  Post,
  Put,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { LogInDto } from './application/dtos';
import { CookieOptions, Request, Response } from 'express';
import { Public } from './decorators/public.decorator';
import { CustomerLoginUseCase } from './application/usecases/customer-login.usecase';
import { RefreshSessionUseCase } from './application/usecases/refresh-session.usecase';
import { ITokens } from './domain/entities/tokens';
import { AuthService } from './auth.service';
import { UserLoginUseCase } from './application/usecases/user-login.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly customerLoginUseCase: CustomerLoginUseCase,
    private readonly userLoginUseCase: UserLoginUseCase,
    private readonly refreshSessionUseCase: RefreshSessionUseCase,
  ) { }

  @Public()
  @Post('customers')
  async customerLogIn(
    @Body() logInDto: LogInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.customerLoginUseCase.run(
      logInDto,
    );

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000
    };

    res.cookie('token', refreshToken, cookieOptions);

    return { token: accessToken };
  }

  @Public()
  @Post('users')
  async userLogIn(
    @Body() logInDto: LogInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.userLoginUseCase.run(
      logInDto,
    );

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie('token', refreshToken, cookieOptions);

    return { token: accessToken };
  }

  @Public()
  @Put('refresh-token')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
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
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie('token', tokens.refreshToken, cookieOptions);

    return { token: tokens.accessToken };
  }
}
