import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LogInDto } from './domain/dtos/log-in.dto';
import { AuthGuard } from './auth.guard';
import { LoginUseCase } from './application/usecases/login.usecase';
import { CookieOptions, Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post("login")
  async logIn(@Req() req: Request, @Res() res: Response) {
    const logInDto: LogInDto = req.body;
    const { accessToken, refreshToken } = await this.loginUseCase.run(logInDto);

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60,
      path: '/refresh-token',
    };

    return res.status(201).json({ accessToken }).cookie("refreshToken", refreshToken, cookieOptions)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

}
