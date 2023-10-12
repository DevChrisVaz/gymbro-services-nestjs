import { Controller, Get, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { LogInDto } from './domain/dtos/log-in.dto';
import { AuthGuard } from './auth.guard';
import { LoginUseCase } from './application/usecases/login.usecase';
import { CookieOptions, Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
  ) { }

  @Post("login")
  async logIn(@Req() req: Request, @Res() res: Response) {
    const logInDto: LogInDto = req.body;
    const { accessToken, refreshToken } = await this.loginUseCase.run(logInDto);

    const cookieOptions: CookieOptions = {
      httpOnly: true, // La cookie solo es accesible desde el servidor
      secure: true, // Solo se envía sobre conexiones HTTPS
      sameSite: 'strict', // Protege contra ataques CSRF
      maxAge: 30 * 24 * 60 * 60, // Tiempo de expiración en segundos (por ejemplo, 30 días)
      path: '/token', // La ruta donde se enviará la cookie (ajusta según tus necesidades)
    };

    return res.status(201).json({ token: accessToken }).cookie("token", refreshToken, cookieOptions)
  }

  @Put("refresh")
  async refreshSession(@Req() req: Request, @Res() res: Response) {

  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

}
